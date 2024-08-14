import axios from 'axios';
async function createPaymentRequest(amount: string, currency: string, orderId: string) {
    try {
        const response = await axios.post('https://api.cryptomus.com/v1/payment', {
            amount,
            currency,
            order_id: orderId,
        }, {
            headers: {
                merchant: '8b03432e-385b-4670-8d06-064591096795',
                sign: 'fe99035f86fa436181717b302b95bacff1',
                'Content-Type': 'application/json',
            },
        });

        // Обработка успешного ответа
        const paymentRequest = response.data.result;
        console.log('Payment request created:', paymentRequest);
        // Вы можете использовать paymentRequest для создания ссылки на страницу оплаты или выполнения других действий

        return paymentRequest;
    } catch (error) {
        // Обработка ошибки
        console.error('Error creating payment request:', error);
        throw error;
    }
}