import { http, delay, HttpResponse } from "msw";

export const handlers = [
	http.get(`${process.env.REACT_APP_API_URL}points/pointsWithHaveTickets`, ({ request }) => {
    console.log('Request body:', request.body);
		return HttpResponse.json([
			{
				"point_id": "9b872118-82fa-42c4-9d64-234ddb373fa7",
				"company_id": "8b5d23a5-52be-4098-bd47-0918b0d130b6",
				"name": "Lily MOCKED",
				"description": "",
				"created": "2023-08-31T11:35:03.136Z",
				"phone_number": null,
				"hastickets": true
			},
			{
				"point_id": "5cf5553a-8d9a-4bec-81e4-5a5f281640bd",
				"company_id": "8b5d23a5-52be-4098-bd47-0918b0d130b6",
				"name": "Yany 1013 MOCKED",
				"description": "123",
				"created": "2023-09-01T04:13:06.909Z",
				"phone_number": "0991223499",
				"hastickets": false
			}
		]);
	}),

  http.get('https://reqres.in/api/users', (req, res, ctx) => {
    return HttpResponse.json({
        data: [{
          id: 7,
          email: "michael.lawson@reqres.in",
          first_name: "Michael",
          last_name: "Lawson",
          avatar: "https://reqres.in/img/faces/7-image.jpg",
        },],
      });
  }),


	http.post("/api/messages", async ({ request }) => {
		const authToken = request.headers.get("Authorization");
		if (!authToken)
			return HttpResponse.json({ msg: "Unauthorized" }, { status: 401 });
		const requestBody = await request.json();
		return HttpResponse.json(
			{
				content: requestBody.content,
				createdAt: new Date().toLocaleString(),
			},
			{ status: 201 }
		);
	}),
];
