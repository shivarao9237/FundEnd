import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon, PlusIcon, UserCircleIcon} from '@heroicons/react/24/outline'
import  logo  from '../assets/icon.jpg';
import { Link } from 'react-router-dom';



const navigation = [
    { name: 'Donate', href: '/donate', current: false },
    { name: 'Investments', href: '/investments', current: false },
    { name: 'DashBoard', href: '/dashboard', current: false },
    
  ]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function handleCurrent(name) {
  navigation.forEach(item => {
    item.current = item.name === name;
  });
}

export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Left section: App Title and Donate Link */}
          <div className="flex items-center">
          <img 
                alt="FundEnd"
                src={ logo }
                className="h-11 w-10 rounded-full cursor-pointer"
                onClick={() => window.location.href = '/'}

              />
            <a href="/" className="text-white font-bold p-2 text-xl mr-4">
              FundEnd
            </a>
            
            <a 
              href="/donate" 
              className={classNames(
                navigation.find(item => item.name === 'Donate').current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'rounded-md px-3 py-2 text-sm font-medium'
              )}
              onClick={() => handleCurrent('Donate')}
            >
              Donate
            </a>
          </div>

          {/* Center section: Start Fundraiser button */}
          <div className="flex-grow flex justify-center">
            <a 
              href="/start-fund" 
              className="bg-green-500 text-white rounded-md px-4 py-2 text-sm font-medium inline-flex items-center space-x-1 hover:bg-green-600"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Start Fundraiser</span>
            </a>
          </div>

          {/* Right section: DashBoard, Investments, and Profile icon */}
          <div className="flex items-center space-x-4">
            {navigation.filter(item => item.name !== 'Donate').map(item => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'rounded-md px-3 py-2 text-sm font-medium'
                )}
                onClick={() => handleCurrent(item.name)}
              >
                {item.name}
              </a>
            ))}
            {/* Profile Icon */}
            <Link
  to="/profile"
  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
>
  <span className="sr-only">View profile</span>
  <UserCircleIcon aria-hidden="true" className="h-6 w-6" />
</Link>
          </div>

          {/* Mobile menu button */}
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              <XMarkIcon className="hidden h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map(item => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium'
              )}
              onClick={() => handleCurrent(item.name)}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
