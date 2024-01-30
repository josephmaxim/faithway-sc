import { Nav, NavItem } from 'reactstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';

const GuidelinesNav = (props) => {

  const router = useRouter();

  const navItems = [
    {label: 'General', href: '', active: false},
    {label: 'Platform', href: '/platform', active: false},
    {label: 'Math', href: '/math', active: false},
    {label: 'Spelling', href: '/spelling', active: false},
    {label: 'Essay Writing', href: '/essay-writing', active: false},
    {label: 'Poetry Writing', href: '/poetry-writing', active: false},
    {label: 'Short Story Writing', href: '/short-story-writing', active: false},
    {label: 'Bible Quiz', href: '/bible-quiz', active: false},
    {label: 'Needle & Thread', href: '/needle-thread', active: false},
    {label: 'Woodworking / Arts & Crafts', href: '/woodworking-arts-crafts', active: false},
    {label: 'Drawing & Painting', href: '/drawing-painting', active: false},
    {label: 'Basketball', href: '/basketball', active: false},
    {label: 'Floor Hockey', href: '/floor-hockey', active: false},
    {label: 'Expressive Reading', href: '/expressive-reading', active: false},
    {label: 'Preaching', href: '/preaching', active: false},
    {label: 'Scripture Recitation', href: '/scripture-recitation', active: false},
    {label: 'Poetry Recitation', href: '/poetry-recitation', active: false},
    {label: 'Instrumental', href: '/instrumental', active: false},
    {label: 'Vocal', href: '/vocal', active: false},
    {label: 'Group Scripture Recitation', href: '/group-scripture-recitation', active: false},
    {label: 'Photography', href: '/photography', active: false},
  ]

  const NavLink = ({children, href, active}) => <NavItem>
    <Link
      href={'/guidelines' + href}
      className={`nav-link${active ? ' active' : ''}`}
    >
      {children}
    </Link>
  </NavItem>

  return <Nav vertical pills>
    {
      navItems.map((i,key) => <NavLink 
        key={key} 
        active={router.asPath == `/guidelines${i.href}`} 
        href={i.href}
      >
        {i.label}
      </NavLink>)
    }
  </Nav>
}

export default GuidelinesNav;