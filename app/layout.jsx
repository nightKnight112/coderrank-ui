import { ThemeProvider } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import "./globals.css";
import { CustomThemeProvider } from "./CustomThemeProvider";

export const metadata = {
	title: "CoderRank",
	description: "A programming platform for aspiring developers!",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<CustomThemeProvider>
					<Navbar></Navbar>
					{children}
				</CustomThemeProvider>
			</body>
		</html>
	);
}
