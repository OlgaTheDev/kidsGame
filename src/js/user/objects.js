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
        
        
        
        

        
    })
    
    
})(jQuery);