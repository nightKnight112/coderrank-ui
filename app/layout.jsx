import { CustomThemeProvider } from "./CustomThemeProvider";
import "./globals.css";
// import {Cantarell} from "next/font/google";
// import { Inter } from "next/font/google"

export const metadata = {
	title: "CoderRank",
	description: "A programming platform for aspiring developers!",
};
// const inter = Inter({ subsets: ['latin'] })
export default function RootLayout({ children }) {
	return (
		<html>
			<body>
				<CustomThemeProvider>
					{children}
				</CustomThemeProvider>
			</body>
		</html>
	);
}