
source ~/.config/fish/functions/custom_abbr.fish

set fish_greeting

export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

zoxide init fish | source
starship init fish | source
