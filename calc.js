        let displayAtual = document.getElementById('displayAtual');
        let displayAnterior = document.getElementById('displayAnterior');
        let operacaoAtual = '';
        let numeroAnterior = '';
        let novoNumero = true;

        function adicionarNumero(num) {
            if (num === '.' && displayAtual.textContent.includes('.')) return;
            
            if (novoNumero || displayAtual.textContent === '0') {
                displayAtual.textContent = num === '.' ? '0.' : num;
                novoNumero = false;
            } else {
                displayAtual.textContent += num;
            }
        }

        function operacao(op) {
            if (operacaoAtual && !novoNumero) {
                calcular();
            }
            
            numeroAnterior = displayAtual.textContent;
            operacaoAtual = op;
            displayAnterior.textContent = `${numeroAnterior} ${op}`;
            novoNumero = true;
        }

        function calcular() {
            if (!operacaoAtual || novoNumero) return;
            
            let num1 = parseFloat(numeroAnterior);
            let num2 = parseFloat(displayAtual.textContent);
            let resultado;

            switch (operacaoAtual) {
                case '+':
                    resultado = num1 + num2;
                    break;
                case '-':
                    resultado = num1 - num2;
                    break;
                case '×':
                    resultado = num1 * num2;
                    break;
                case '÷':
                    if (num2 === 0) {
                        displayAtual.textContent = 'Erro';
                        displayAnterior.textContent = '';
                        operacaoAtual = '';
                        novoNumero = true;
                        return;
                    }
                    resultado = num1 / num2;
                    break;
                case '%':
                    resultado = num1 % num2;
                    break;
            }

            displayAnterior.textContent = `${numeroAnterior} ${operacaoAtual} ${num2} =`;
            displayAtual.textContent = Number.isInteger(resultado) ? resultado : resultado.toFixed(8).replace(/\.?0+$/, '');
            operacaoAtual = '';
            novoNumero = true;
        }

        function limpar() {
            displayAtual.textContent = '0';
            displayAnterior.textContent = '';
            operacaoAtual = '';
            numeroAnterior = '';
            novoNumero = true;
        }

        function apagar() {
            if (displayAtual.textContent.length > 1) {
                displayAtual.textContent = displayAtual.textContent.slice(0, -1);
            } else {
                displayAtual.textContent = '0';
                novoNumero = true;
            }
        }

        function trocarSinal() {
            displayAtual.textContent = String(-parseFloat(displayAtual.textContent));
        }

        // Suporte para teclado
        document.addEventListener('keydown', function(e) {
            if (e.key >= '0' && e.key <= '9' || e.key === '.') {
                adicionarNumero(e.key);
            } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
                let op = e.key === '*' ? '×' : e.key === '/' ? '÷' : e.key;
                operacao(op);
            } else if (e.key === 'Enter' || e.key === '=') {
                calcular();
            } else if (e.key === 'Escape' || e.key === 'c') {
                limpar();
            } else if (e.key === 'Backspace') {
                apagar();
            }
        });