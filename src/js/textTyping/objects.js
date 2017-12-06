(function ($) {
    
    $(document).ready(function () {
        
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

    })
    
    
})(jQuery);