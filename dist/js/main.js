(function ($) {
    
    $(document).ready(function () {
        
        //USER NAME
        class User {
            
            constructor() {
                this.usernameInput = document.getElementById('username');
                this.username = '';
            }
            
            getName() {
                let trimmedName = this.usernameInput.value.trim('');
                if (trimmedName != '') {
                    return trimmedName
                }
                return 'Kid';
            }
            
            saveName() {
                document.getElementById('go-btn').onclick = () => {
                    this.username = this.getName();
                }            
            }

        }
        
        const user = new User();
    

        
        
        //TYPE ANIMATION
        class Type {
            
            constructor() {

            }
        
            splitIntoLetters(str) {
                    
                let letters = str.textContent.split('');

                letters.forEach((letter, index, letters) => {
                    letters[index] = '<i>' + letter + '</i>';
                });

                let newLetters = letters.join('');
                str.innerHTML = newLetters;

            }
            
//            showLetter(newStr, callback) {
//                                                
//                for (let i = 0; i < newStr.length; i++) {
//                    setTimeout(() => newStr[i].classList.add('in'), 100 + i * 100,  )
//                }
//                
//                if (callback) {
//                    setTimeout(() => callback(), 100 + (newStr.length+1) * 100,  )
//                    
//                }
//            }
            
            showLetter(newStr, callback) {
                let letters = Array.from(newStr);
                
                if (letters.length) {
                    setTimeout(() => {
                        letters[0].classList.add('in');
                        let newVar = letters.slice(1);
                        this.showLetter(newVar, callback);
                    }, 80);
                } else {
                    callback();
                }
            }
            
            animateString(str, callback) {
                                
                this.splitIntoLetters(str);
                
                str.classList.add('typing', 'shown');
                
                let strLetters = str.querySelectorAll('i');
                this.showLetter(strLetters, () => str.classList.add('waiting') );
                
                setTimeout( function () {
                    str.classList.remove('waiting');
                    str.classList.remove('typing');
                    callback();
                }, 2000 );
            }

        }
        
        const typingText = new Type();
        const text = document.querySelectorAll('.typing-text');
        
        const usernameInput = {
            
            username: document.getElementById('username'),
            currentName: '',
            paragraphIsShown: false,
            
            show() {
                this.username.classList.add('shown');
                this.username.focus();
            },
            
            fillUsernameHolders() {
                this.currentName = user.getName(); 
                document.querySelectorAll('.username-holder').forEach((el) => el.innerHTML = this.currentName)
            },
            
            onInput() {                
                this.username.oninput = () => this.fillUsernameHolders();
            },
            
            onBlur(paragraph, callback) {
               this.username.onblur = () => {
                   if (!this.paragraphIsShown) {
                       
                       this.paragraphIsShown = true;
                       callback();
                       
                   } else {
                       
                       paragraph.innerHTML = '<span class="username-holder"></span> do you want to play?';
                       this.fillUsernameHolders();
                   }
               }
               
               this.username.onkeypress = (e) => {
                   if (e.keyCode == '13') {
                        this.username.blur();
                    }
               }

            },
                        
            init() {
                this.onInput();
                this.onBlur();
            }
        };
        
        usernameInput.init();
        
        typingText.animateString(text[0], () => {
            typingText.animateString(text[1], () => {
                usernameInput.show();
                usernameInput.onBlur(text[2], () => {
                    typingText.animateString(text[2], () => {
                        setTimeout( () => document.getElementById('go-btn').classList.add('in'), 500 );
                    });
                });
            })
        });
        
        

        
    })
    
    
})(jQuery);