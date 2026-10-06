# Copy Number from Selection

Select some lines, run one command, and get only the numbers on your clipboard — one per line, in the order they appear. Paste them straight into a spreadsheet, an ERP search field or any other app.

## Example

Selected text:

```markdown
- [[Acme]] 105173 **check missing items**
- [[Globex]] 105176
- [[Cable]] 2m 105225
- [[Initech]] 105358 - 105359 -  105360    make to stock
- [ ] [[Globex]] 105361
```

Clipboard after running the command:

```
105173
105176
105225
105358
105359
105360
105361
```

Only numbers with the configured length are copied, so the `2` in `2m` is ignored, and so are dates such as `06.10.2026`. Several numbers on one line are copied left to right.

## Usage

1. Select the lines in the editor.
2. Run **Copy Number from Selection: Copy numbers, one per line** from the command palette.
3. Paste anywhere.

The plugin does not set a default hotkey. Assign your own under **Settings → Hotkeys**. For example, search for "Copy numbers" and set `Ctrl+Shift+C`.

## Settings

- **Number length** (default `6`): only numbers with exactly this many digits are copied. Numbers that touch other digits are skipped. For example, with length 6 the 7-digit `1234567` is not split into a 6-digit number.

Lines are separated with `CRLF`, so Excel and other Windows apps put each number on its own row.

## Installation

- **Community plugins:** Settings → Community plugins → Browse → search for "Copy Number from Selection".
- **Manual:** download `main.js` and `manifest.json` from the latest release into `<vault>/.obsidian/plugins/copy-number-from-selection/`, then enable the plugin.

---

## Türkçe

Satırları seçin, komutu çalıştırın. Panoya yalnızca numaralar kopyalanır: her biri ayrı satırda, notta göründükleri sırayla.

- **Komut:** "Numaraları alt alta kopyala". Varsayılan kısayol yoktur; **Ayarlar → Kısayollar**'dan atayabilirsiniz (ör. `Ctrl+Shift+C`).
- **Ayar:** "Numara uzunluğu" (varsayılan 6). Yalnızca tam olarak bu kadar haneli sayılar alınır. Böylece `2m kablo` ya da `06.10.2026` gibi ifadeler atlanır.
- Obsidian'ın dili Türkçeyse komut ve uyarılar Türkçe görünür.

## License

[MIT](LICENSE)
