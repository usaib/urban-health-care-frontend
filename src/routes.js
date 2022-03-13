import DashboardLayout from "./components/layout/DashboardLayout";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import User from "./pages/User";

const routes = [
	{
		path: "/",
		element: <Login />
	},
	{
		path: "app/dashboard",
		element: <DashboardLayout />,
		children: [
			{ path: "orders", element: <Orders /> },
			{ path: "stockHistory", element: <User /> }
		]
	}
];

export default routes;
