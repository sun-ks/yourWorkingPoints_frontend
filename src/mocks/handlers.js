import { HttpResponse, delay, http } from 'msw';

export const handlers = [
  http.get(
    `${process.env.REACT_APP_API_URL}points/pointsWithHaveTickets`,
    ({ request }) => {
      return HttpResponse.json([
        {
          point_id: '9b872118-82fa-42c4-9d64-234ddb373fa7',
          company_id: '8b5d23a5-52be-4098-bd47-0918b0d130b6',
          name: 'Lily MOCKED 1',
          description: '',
          created: '2023-08-31T11:35:03.136Z',
          phone_number: null,
          hastickets: true,
        },
        {
          point_id: '5cf5553a-8d9a-4bec-81e4-5a5f281640bd',
          company_id: '8b5d23a5-52be-4098-bd47-0918b0d130b6',
          name: 'Yany 1013 MOCKED',
          description: '123',
          created: '2023-09-01T04:13:06.909Z',
          phone_number: '0991223499',
          hastickets: false,
        },
      ]);
    },
  ),

  /*http.post(`${process.env.REACT_APP_API_URL}auth/login/`, ({ request }) => {
		return HttpResponse.json(
      {
        "accessToken": "accessToken",
        "userInfo": {
          "name": "igor2",
          "user_id": "bd03ab15-28d1-4b2c-8aac-2d3910384c80",
          "email": "igor2@email.com",
          "role": "owner",
          "created": "2023-08-31T10:44:06.715Z",
          "is_active": true
        }
      }
    );
	}),*/

  http.get('https://reqres.in/api/users', (req, res, ctx) => {
    return HttpResponse.json({
      data: [
        {
          id: 7,
          email: 'michael.lawson@reqres.in',
          first_name: 'Michael',
          last_name: 'Lawson',
          avatar: 'https://reqres.in/img/faces/7-image.jpg',
        },
      ],
    });
  }),

  http.post('/api/messages', async ({ request }) => {
    const authToken = request.headers.get('Authorization');
    if (!authToken)
      return HttpResponse.json({ msg: 'Unauthorized' }, { status: 401 });
    const requestBody = await request.json();
    return HttpResponse.json(
      {
        content: requestBody.content,
        createdAt: new Date().toLocaleString(),
      },
      { status: 201 },
    );
  }),
];
