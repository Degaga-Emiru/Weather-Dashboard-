import ThemeToggle from './ThemeToggle'

const Header = () => {
  return (
    <header className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
        Weather Dashboard
      </h1>
      <ThemeToggle />
    </header>
  )
}

export default Header