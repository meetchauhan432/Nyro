"""Optional browser regression suite. Set NYRO_TEST_URL to your running Vite frontend.
For offline testing, set NYRO_PREVIEW_HTML to the generated standalone preview.
Install Python Playwright and Chromium separately; no npm test dependency is added.
"""
import os
from pathlib import Path
from playwright.sync_api import sync_playwright

URL = os.getenv('NYRO_TEST_URL', 'http://localhost:5173')
PREVIEW = os.getenv('NYRO_PREVIEW_HTML')
CHROMIUM = os.getenv('NYRO_CHROMIUM_PATH')
WIDTHS = [1920, 1440, 1280, 1024, 768, 390, 320]

def load(page):
    if PREVIEW:
        page.set_content(Path(PREVIEW).read_text(encoding='utf-8'))
    else:
        page.goto(URL)
    page.locator('.balance-value').wait_for()
    page.wait_for_timeout(750)

def go_members(page, width):
    if width <= 820:
        page.get_by_role('button', name='Open navigation').click()
        page.wait_for_timeout(350)
    toggle = page.get_by_role('button', name='Users & roles', exact=True)
    if toggle.get_attribute('aria-expanded') != 'true':
        toggle.click()
    page.locator('.role-item').first.click()
    page.wait_for_timeout(250)

def no_overflow(page):
    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(executable_path=CHROMIUM, args=['--no-sandbox'] if CHROMIUM else [])
    errors = []
    def new_page(width=1440, motion='reduce'):
        page = browser.new_page(viewport={'width': width, 'height': 900}, reduced_motion=motion, accept_downloads=True)
        page.on('pageerror', lambda error: errors.append(str(error)))
        return page

    for width in WIDTHS:
        page = new_page(width)
        load(page)
        assert page.locator('.balance-value').inner_text() == '₹1,24,850.00'
        no_overflow(page)
        go_members(page, width)
        assert page.locator('.member-row').count() == 12
        no_overflow(page)
        page.locator('.member-row').first.click()
        page.get_by_role('button', name='Save profile').wait_for()
        no_overflow(page)
        page.get_by_role('button', name='Back to members').click()
        page.get_by_role('button', name='Create user', exact=True).click()
        page.locator('[role=dialog]').wait_for()
        no_overflow(page)
        page.close()
        print(f'PASS: {width}px — dashboard, directory, profile, create user', flush=True)

    page = new_page(motion='no-preference')
    load(page)
    service = page.locator('.service-tile').first
    service.hover()
    page.wait_for_timeout(350)
    assert service.locator('.service-icon svg').evaluate('el => getComputedStyle(el).transform') == 'none'
    assert service.evaluate('el => getComputedStyle(el).transform') != 'none'
    for status, expected in [('Completed', '₹1,19,840.00'), ('Failed', '₹1,19,840.00'), ('Pending', '₹1,14,830.00')]:
        page.locator('.balance-actions button').nth(1).click()
        dialog = page.locator('[role=dialog]')
        dialog.locator('input').fill('9000000000')
        dialog.get_by_role('button', name='Find customer').click()
        dialog.locator('.beneficiary').first.click()
        dialog.get_by_role('button', name='Continue').click()
        dialog.locator('input').fill('5000')
        dialog.get_by_role('button', name='Review payout').click()
        dialog.locator('select').select_option(status)
        dialog.get_by_role('button', name='Confirm demo payout').click()
        dialog.get_by_role('button', name='Done').wait_for()
        page.wait_for_timeout(550)
        assert page.locator('.balance-value').inner_text() == expected
        dialog.get_by_role('button', name='Done').click()
        print(f'PASS: {status} payout and exact balance', flush=True)
    page.locator('.balance-actions button').first.click()
    dialog = page.locator('[role=dialog]')
    dialog.locator('input').fill('1000')
    dialog.get_by_role('button', name='Confirm demo top-up').click()
    dialog.get_by_role('button', name='Done').wait_for()
    page.wait_for_timeout(550)
    assert page.locator('.balance-value').inner_text() == '₹1,15,830.00'
    dialog.get_by_role('button', name='Done').click()
    page.get_by_role('button', name='Transactions', exact=True).click()
    page.get_by_role('textbox', name='Search transactions').fill('Wallet top-up')
    assert page.locator('.transaction-row').count() == 2
    with page.expect_download() as download:
        page.get_by_role('button', name='Export CSV').click()
    assert download.value.suggested_filename == 'nyro-demo-transactions.csv'
    page.locator('.transaction-row').first.click()
    page.get_by_role('button', name='Close dialog').click()
    page.get_by_role('button', name='Wallets', exact=True).click()
    page.locator('.balance-value').wait_for()
    page.get_by_role('button', name='Hide balances').click()
    assert '••' in page.locator('.balance-value').inner_text()
    page.get_by_role('button', name='Show balances').click()
    page.wait_for_timeout(650)
    assert page.locator('.balance-value').inner_text() == '₹1,15,830.00'
    print('PASS: add money, transaction search, CSV, receipt, wallets and privacy', flush=True)
    page.get_by_role('button', name='Services', exact=True).click()
    assert page.locator('.service-tile').count() == 4
    page.locator('.service-tile').nth(2).click()
    page.get_by_role('button', name='Back to workspace').click()
    page.keyboard.press('Control+k')
    page.locator('.command-search input').fill('overview')
    page.locator('.command-option').first.click()
    page.locator('.balance-value').wait_for()
    go_members(page, 1440)
    page.get_by_role('button', name='Create user', exact=True).click()
    dialog = page.locator('[role=dialog]')
    dialog.get_by_label('Full name').fill('Demo Test Member')
    dialog.get_by_label('Mobile number').fill('9000004321')
    dialog.get_by_label('Email address').fill('new@example.invalid')
    dialog.get_by_label('Region').fill('Gujarat')
    dialog.get_by_label('Parent account').select_option('N106')
    dialog.get_by_role('button', name='Create demo user').click()
    page.get_by_role('button', name='View member Demo Test Member').wait_for()
    page.get_by_role('button', name='View member Demo Test Member').click()
    page.get_by_label('Full name').fill('Demo Updated Member')
    page.get_by_role('button', name='Save profile').click()
    page.get_by_role('heading', name='Demo Updated Member').wait_for()
    page.get_by_role('button', name='Schemes', exact=True).click()
    page.get_by_label('Assigned scheme').select_option('Special scheme')
    page.get_by_role('button', name='Save scheme').click()
    page.get_by_role('button', name='Parent mapping', exact=True).click()
    page.get_by_label('Parent account').select_option('N109')
    page.get_by_role('button', name='Save mapping').click()
    assert page.locator('.profile-hero-meta').inner_text().find('Vihaan Roy') >= 0
    for tab in ['Security', 'KYC upload', 'Wallet lock', 'Device mapping']:
        page.get_by_role('button', name=tab, exact=True).click()
        assert page.locator('.profile-tab-content .detail-list').count() == 1
    page.get_by_role('button', name='Back to members').click()
    page.get_by_role('textbox', name='Search members').fill('Demo Updated Member')
    assert page.locator('.member-row').count() == 1
    page.get_by_role('button', name='Create user', exact=True).click()
    dialog = page.locator('[role=dialog]')
    dialog.get_by_label('Full name').fill('Duplicate Demo')
    dialog.get_by_label('Mobile number').fill('9000004321')
    dialog.get_by_label('Email address').fill('new@example.invalid')
    dialog.get_by_label('Region').fill('Gujarat')
    dialog.get_by_label('Parent account').select_option('N106')
    dialog.get_by_role('button', name='Create demo user').click()
    assert 'already assigned' in dialog.locator('.form-error').inner_text()
    dialog.get_by_role('button', name='Close dialog').click()
    print('PASS: role directory, creation, duplicate check, profile, schemes, parent and all tabs', flush=True)
    page.get_by_role('button', name='Overview', exact=True).click()
    page.get_by_role('button', name='Collapse sidebar').click()
    assert page.locator('.sidebar').evaluate("el => el.classList.contains('collapsed')")
    page.get_by_role('button', name='Expand sidebar').click()
    page.get_by_role('button', name='Account menu').click()
    page.get_by_role('button', name='Pause wallet background motion').click()
    assert page.locator('.app').evaluate("el => el.classList.contains('ambient-paused')")
    page.get_by_role('button', name='Resume wallet background motion').click()
    page.get_by_role('button', name='Reset demo data').click()
    page.wait_for_timeout(650)
    assert page.locator('.balance-value').inner_text() == '₹1,24,850.00'
    page.close()

    page = new_page(390, 'no-preference')
    load(page)
    page.evaluate('window.scrollTo(0, document.documentElement.scrollHeight)')
    page.wait_for_timeout(600)
    assert page.locator('.topbar').evaluate("el => el.classList.contains('is-scrolled') && Number(el.style.getPropertyValue('--scroll-progress')) > .98")
    assert page.locator('.nyro-scroll-reveal').count() > 0
    page.close()
    page = new_page(390, 'reduce')
    load(page)
    assert page.locator('.wallet-decoration').evaluate("el => getComputedStyle(el, '::before').animationName") == 'none'
    page.evaluate('window.scrollTo(0, document.documentElement.scrollHeight)')
    page.wait_for_timeout(250)
    assert page.locator('.nyro-scroll-reveal').count() == 0
    print('PASS: hover, sidebar, ambient motion, scroll and reduced motion', flush=True)
    assert not errors, errors
    print('PASS: no browser page errors', flush=True)
    browser.close()
