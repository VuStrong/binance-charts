import ThemeSwitcher from "./ThemeSwitcher";

export default function Header() {
    return (
        <header className="flex justify-end w-full bg-white dark:bg-bodydark border-b dark:border-white border-black px-5 py-3">
            <ThemeSwitcher />
        </header>
    );
}
