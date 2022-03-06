import DashboardLayout from "./components/layout/DashboardLayout";
import Login from "./pages/Login";
import Orders from "./pages/Orders";

const routes = [
	{
		path: "/",
		element: <Login />
	},
	{
		path: "app/dashboard",
		element: <DashboardLayout />,
		children: [{ path: "orders", element: <Orders /> }]
	}
];

export default routes;
