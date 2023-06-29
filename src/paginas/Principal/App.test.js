import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '../../routes';

describe('App', () => {
    test('Deve permitir adicionar uma transação em Extrato', () => {
        render(<App />, { wrapper: BrowserRouter });
        const campoValor = screen.getByPlaceholderText('Digite um valor');
        const select = screen.getByRole('combobox');
        const botao = screen.getByRole('button');

        userEvent.selectOptions(select, ['Depósito']);
        userEvent.type(campoValor, '100');
        userEvent.click(botao);

        const novaTransacao = screen.getByTestId('lista-transacoes');
        const itemExtrato = screen.getByRole('listitem');

        expect(novaTransacao).toContainElement(itemExtrato);
    });

    test('Deve navegar até a página correspondente ao link clicado', async () => {
        render(<AppRoutes />, { wrapper: BrowserRouter });

        const linkPaginaCartaoes = screen.getByText('Cartões');
        expect(linkPaginaCartaoes).toBeInTheDocument();

        userEvent.click(linkPaginaCartaoes);
        
        const tituloPaginaCartoes = await screen.findByText('Meus cartões');
        expect(tituloPaginaCartoes).toBeInTheDocument();
        
    })

    test('Should navigate to the investment page when the link is clicked', async () => {
        render(<AppRoutes />, { wrapper: BrowserRouter });

        const linkInvestimentos = screen.getByText('Investimentos');
        userEvent.click(linkInvestimentos);

        const tituloPaginaInvestimentos = await screen.findByText('Renda Fixa');
        expect(tituloPaginaInvestimentos).toBeInTheDocument();
    })
})
