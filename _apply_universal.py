import os, re, glob

BASE = r'D:\\Claude Code Porjects\\Naja Safety\\site'

TICKER_ROOT = '''  <!-- Statutory Ticker -->
  <div class="ticker-bar" aria-label="Statutory compliance ticker">
    <div class="ticker-inner">
      <span class="ticker-item">LIVE · Section 29A OSH (Amendment) Act 2022 in force</span>
      <span class="ticker-item">5+ employees = mandatory OSH Coordinator</span>
      <span class="ticker-item">Corporate fines up to RM500,000</span>
      <span class="ticker-item">Director criminal liability</span>
      <span class="ticker-item">HRD Corp claimable programmes</span>
      <span class="ticker-item">CIDB Center PLSICW20231022-068</span>
    </div>
  </div>

  <!-- Header -->'''

TICKER_SUB = '''  <!-- Statutory Ticker -->
  <div class="ticker-bar" aria-label="Statutory compliance ticker">
    <div class="ticker-inner">
      <span class="ticker-item">LIVE · Section 29A OSH (Amendment) Act 2022 in force</span>
      <span class="ticker-item">5+ employees = mandatory OSH Coordinator</span>
      <span class="ticker-item">Corporate fines up to RM500,000</span>
      <span class="ticker-item">Director criminal liability</span>
      <span class="ticker-item">HRD Corp claimable programmes</span>
      <span class="ticker-item">CIDB Center PLSICW20231022-068</span>
    </div>
  </div>

  <!-- Header -->'''

HAZARD_ROOT = '''  <!-- Footer -->
  <div class="footer-hazard-tape" aria-hidden="true"></div>
  <footer>'''

HAZARD_SUB = '''  <!-- Footer -->
  <div class="footer-hazard-tape" aria-hidden="true"></div>
  <footer>'''

SCRIPT_ROOT = '  <script src="js/main.js"></script>\n  <script src="js/theme-enhance.js"></script>'
SCRIPT_SUB = '  <script src="../js/main.js"></script>\n  <script src="../js/theme-enhance.js"></script>'

for html_path in glob.glob(os.path.join(BASE, '**', '*.html'), recursive=True):
    rel = os.path.relpath(html_path, BASE)
    depth = rel.count(os.sep)
    is_sub = depth > 0

    with open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()

    changed = False

    # Add ticker before <!-- Header -->
    if 'class="ticker-bar"' not in content:
        if is_sub:
            content = content.replace('  <!-- Header -->\n  <header>', TICKER_SUB, 1)
        else:
            content = content.replace('  <!-- Header -->\n  <header>', TICKER_ROOT, 1)
        changed = True

    # Add hazard tape before footer
    if 'footer-hazard-tape' not in content:
        content = content.replace('  <!-- Footer -->\n  <footer>', HAZARD_ROOT if not is_sub else HAZARD_SUB, 1)
        changed = True

    # Add theme-enhance.js
    if 'theme-enhance.js' not in content:
        if is_sub:
            content = content.replace('  <script src="../js/main.js"></script>', SCRIPT_SUB, 1)
            # Also handle sub-sub directories
            content = content.replace('  <script src="../../js/main.js"></script>', '  <script src="../../js/main.js"></script>\n  <script src="../../js/theme-enhance.js"></script>', 1)
        else:
            content = content.replace('  <script src="js/main.js"></script>', SCRIPT_ROOT, 1)
        changed = True

    if changed:
        with open(html_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated: {rel}')
    else:
        print(f'Skipped (already done): {rel}')

print('Done.')
