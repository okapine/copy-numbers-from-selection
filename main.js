const { Plugin, PluginSettingTab, Setting, Notice, getLanguage } = require('obsidian');

const DEFAULT_SETTINGS = { digits: 6 };

const MESSAGES = {
  en: {
    command: 'Copy numbers, one per line',
    noSelection: 'Select some lines first.',
    noNumbers: 'No numbers found in the selection.',
    copied: (n) => (n === 1 ? 'Copied 1 number.' : `Copied ${n} numbers.`),
    digitsName: 'Number length',
    digitsDesc: 'Only numbers with exactly this many digits are copied.',
  },
  tr: {
    command: 'Numaraları alt alta kopyala',
    noSelection: 'Önce satırları seçin.',
    noNumbers: 'Seçimde numara bulunamadı.',
    copied: (n) => `${n} numara kopyalandı.`,
    digitsName: 'Numara uzunluğu',
    digitsDesc: 'Yalnızca tam olarak bu kadar haneli sayılar kopyalanır.',
  },
};

// A number is a run of exactly `digits` digits that does not touch other
// digits, so "2m" or the parts of "06.10.2026" are skipped. Several numbers
// on one line are kept in reading order. (^|\D) is used instead of a
// lookbehind, which older iOS WebViews do not support.
function extractNumbers(text, digits) {
  const re = new RegExp(`(?:^|\\D)(\\d{${digits}})(?!\\d)`, 'g');
  return Array.from(text.matchAll(re), (m) => m[1]);
}

class CopyNumberSettingTab extends PluginSettingTab {
  constructor(app, plugin, msg) {
    super(app, plugin);
    this.plugin = plugin;
    this.msg = msg;
  }

  display() {
    this.containerEl.empty();
    new Setting(this.containerEl)
      .setName(this.msg.digitsName)
      .setDesc(this.msg.digitsDesc)
      .addSlider((slider) => slider
        .setLimits(3, 15, 1)
        .setValue(this.plugin.settings.digits)
        .setDynamicTooltip()
        .onChange(async (value) => {
          this.plugin.settings.digits = value;
          await this.plugin.saveData(this.plugin.settings);
        }));
  }
}

module.exports = class CopyNumbersFromSelection extends Plugin {
  async onload() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    const msg = MESSAGES[getLanguage()] || MESSAGES.en;

    this.addCommand({
      id: 'copy-numbers',
      name: msg.command,
      editorCallback: async (editor) => {
        const selection = editor.getSelection();
        if (!selection) {
          new Notice(msg.noSelection);
          return;
        }
        const numbers = extractNumbers(selection, this.settings.digits);
        if (numbers.length === 0) {
          new Notice(msg.noNumbers);
          return;
        }
        // CRLF so spreadsheets and Windows apps put each number on its own row
        await navigator.clipboard.writeText(numbers.join('\r\n'));
        new Notice(msg.copied(numbers.length));
      },
    });

    this.addSettingTab(new CopyNumberSettingTab(this.app, this, msg));
  }
};
