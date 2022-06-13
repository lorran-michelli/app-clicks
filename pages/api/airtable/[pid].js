/* SERVER SIDE SECURE AIRTABLE API */

import Airtable from "airtable";

Airtable.configure({
	endpointUrl: "https://api.airtable.com",
	apiKey: process.env.AIRTABLE_API_KEY,
});

const base = Airtable.base("appfvBPLRS8AwU2zo");

export default async function handler(req, res) {
	const { pid } = req.query;

	/* if (req.method === "POST") {
		base("Tasks").create(
			[
				{
					fields: {
						user: "Carina Meira",
					},
				},
				{
					fields: {
						user: "Lorran Michelli",
					},
				},
			],
			function (err, records) {
				if (err) {
					console.error(err);
					return;
				}
				records.forEach(function (record) {
					console.log(record.getId());
				});
				res.send(
					`${records.length} records created! Check the console for the record IDs.`
				);
			}
		);
	} */

	if (req.method === "POST" && pid == "login") {
		base("Tasks")
			.select({
				view: "users",
				filterByFormula: `email = ${req.body.email}`,
			})
			.all(function (err, records) {
				if (err) {
					console.error(err);
					res.send(err);
					return;
				} else {
					if (records.length > 0) {
						if (String(records[0].fields.password) === req.body.password) {
							res.send(records[0].id);
						} else {
							res.send("Password incorrect");
						}
					} else {
						res.send("User not found");
					}
				}
			});
	}

	/* else if (req.method === "GET") {
		await axios
			.get(
				`${AIRTABLE}?maxRecords=1&filterByFormula=(%7BEMAIL%7D=%22${req.query.email}%22)`,
				CONFIG
			)
			.then((response) => res.send(response.data))
			.catch((err) => res.status(400).send({}));
	} else if (req.method === "POST") {
		await axios
			.post(`${AIRTABLE}`, { records: [{ fields: req.body }] }, CONFIG)
			.then((response) => res.send(response.data))
			.catch((err) => res.status(400).send({}));
	} else if (req.method === "PATCH") {
		await axios
			.patch(
				`${AIRTABLE}`,
				{ records: [{ id: req.body.id, fields: req.body.fields }] },
				CONFIG
			)
			.then((response) => res.send(response.data))
			.catch((err) => res.status(400).send({}));
	} */
}
