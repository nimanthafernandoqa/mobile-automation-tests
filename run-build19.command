#!/bin/bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"
source ~/.zshrc 2>/dev/null || source ~/.bash_profile 2>/dev/null || true

cd "$HOME/Desktop/mobile-tests-clean"
echo ""
echo "=========================================="
echo "  mobile-tests-clean — Build 20 launcher"
echo "=========================================="
echo ""

echo ">>> [1/3] npm install (lock file reset — fresh install from package.json)"
npm install
if [ $? -ne 0 ]; then echo "npm install FAILED"; read -p "Press Enter to close..."; exit 1; fi

echo ""
echo ">>> [2/3] TypeScript check"
npx tsc --noEmit
if [ $? -ne 0 ]; then echo "TypeScript errors — aborting"; read -p "Press Enter to close..."; exit 1; fi
echo "    TypeScript OK"

echo ""
echo ">>> [3/3] BrowserStack Build 20"
npx wdio run wdio.bs.android.conf.ts

echo ""
read -p "Done. Press Enter to close..."
