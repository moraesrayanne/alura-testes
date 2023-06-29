import { buscaTransacoes } from './transacoes';
import api from './api';

jest.mock('./api');

const mockTransacao = [{
    id: 1,
    transcao: 'Depósito',
    valor: '100',
    data: '22/11/2022',
    mes: 'Novembro',
}];

const mockRequisicao = (retorno) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ 
                data: retorno
             });
        }, 200);
    });
}

const mockRequisicaoErro = () => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject();
        }, 200);
    });
}

describe('Requisições para a api', () => {
    // test('Deve retornar uma lista de transações', async () => {
    //     const transacoes = await buscaTransacoes();
    //     expect(transacoes).toHaveLength(3);

    //     render(<App />, { wrapper: BrowserRouter });
    //     const transacao = await screen.findAllByText('Novembro');
    //     transacao.forEach((item) => {
    //         expect(item).toBeInTheDocument();
    //     });
    // });

    // O teste acima foi feito rodando a api pelo json-server
    // O teste abaixo foi feito simulando com mock

    test('Deve retornar uma lista de transações', async () => {
        api.get.mockImplementation(() => mockRequisicao(mockTransacao));

        const transacoes = await buscaTransacoes();
        expect(transacoes).toEqual(mockTransacao);
        expect(api.get).toHaveBeenCalledWith('/transacoes');
    })

    test('Deve retornar uma lista vazia quando a requisição falhar', async () => {
        api.get.mockImplementation(() => mockRequisicaoErro(mockTransacao));

        const transacoes = await buscaTransacoes();
        expect(transacoes).toEqual([]);
        expect(api.get).toHaveBeenCalledWith('/transacoes');
    })
    
});