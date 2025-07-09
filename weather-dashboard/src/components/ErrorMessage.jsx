import useWeatherStore from '../stores/weatherStore'
import { ExclamationCircleIcon } from '@heroicons/react/outline'

const ErrorMessage = () => {
  const { error, clearError } = useWeatherStore()

  if (!error) return null

  return (
    <div className="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 mb-6 rounded">
      <div className="flex items-center">
        <ExclamationCircleIcon className="h-5 w-5 mr-2" />
        <span>{error}</span>
      </div>
      <button
        onClick={clearError}
        className="mt-2 text-sm text-red-600 dark:text-red-400 hover:underline"
      >
        Dismiss
      </button>
    </div>
  )
}

export default ErrorMessage