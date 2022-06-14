/* SERVER SIDE SECURE AIRTABLE API */

import Airtable from "airtable";

Airtable.configure({
	endpointUrl: "https://api.airtable.com",
	apiKey: process.env.AIRTABLE_API_KEY,
});

const base = Airtable.base("appfvBPLRS8AwU2zo");

export default async function handler(req, res) {
	const { pid } = req.query;

	const createUser = () => {
		base("Tasks").create(
			[
				{
					fields: {
						user: req.body.name,
						email: req.body.email,
						password: req.body.password,
						bank: "0",
						CPF: req.body.cpf,
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
					`${records.length} record created! Check the console for the record ID.`
				);
			}
		);
	};

	if (req.method === "POST" && pid == "create") {
		base("Tasks")
			.select({
				view: "users",
				filterByFormula: `CPF = ${req.body.cpf}`,
			})
			.all(function (err, records) {
				if (err) {
					console.log(err);
				}
				if (records.length > 0) {
					res.status(403).json({ message: "User already exists" });
					return;
				} else {
					createUser();
				}
			});
	}

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
							res.send({ id: records[0].id, name: records[0].fields.user });
						} else {
							res.send("Password incorrect");
						}
					} else {
						res.send("User not found");
					}
				}
			});
	}

	if (req.method === "POST" && pid == "me") {
		base("Tasks").find(`${req.body.id}`, function (err, record) {
			if (err) {
				console.error(err);
				return;
			}
			res.send({ name: record.fields.user, bank: record.fields.bank });
		});
	}

	if (req.method === "PATCH") {
		base("Tasks").update(
			[
				{
					id: req.body.id,
					fields: {
						bank: req.body.bank,
					},
				},
			],
			function (err, records) {
				if (err) {
					console.error(err);
					return;
				}
				records.forEach(function (record) {
					res.send(record.id);
					console.log(record.id);
				});
			}
		);
	}
}
