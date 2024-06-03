function ll --wraps='eza -lT -L=1 --icons --color --hyperlink -a' --wraps='eza -lT -L=1 --icons --color --hyperlink' --wraps='eza -lT -L=2 --icons --color --hyperlink -a' --description 'alias ll eza -lT -L=2 --icons --color --hyperlink -a'
  eza -lT -L=2 --icons --color --hyperlink -a $argv
        
end
