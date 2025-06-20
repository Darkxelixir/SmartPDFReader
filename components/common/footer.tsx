export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white p-4 text-center">
            <p className="text-sm">
                &copy; {new Date().getFullYear()} Smart PDF Reader. All rights reserved.
            </p>
            <p className="text-xs mt-2">
                Made with ❤️ by the Smart PDF Reader Team
            </p>
        </footer>
    );
}