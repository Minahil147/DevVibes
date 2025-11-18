# DashboardLanding Component - Complete Structure

## File: `client/src/assets/components/Dashboard/DashboardLanding.jsx`

### Overview

Single unified component that serves as:

1. **Landing Page** for unauthenticated users
2. **Main Dashboard** for authenticated users

---

## Component Structure (Code Flow)

```
DashboardLanding Component
│
├── State Management
│   ├── posts (useState)
│   ├── loading (useState)
│   ├── currentPage (useState)
│   └── totalPages (useState)
│
├── Authentication Check
│   ├── useAuth() → { auth, setAuth }
│   └── auth?.accessToken determines which view to show
│
├── Effect Hooks
│   ├── fetchPosts() → Auto-load when authenticated
│   └── Scroll to top on mount
│
├── Conditional Rendering
│   ├── If NOT authenticated → Landing Page UI
│   └── If authenticated → Dashboard UI
│
└── Imported Components
    ├── Activity.jsx
    ├── Events.jsx
    ├── UserInfo.jsx
    ├── Blogs.jsx
    ├── Posts.jsx (with pagination)
    ├── WelcomeBanner.jsx
    └── MutualPeople.jsx
```

---

## Landing Page UI Sections (No Auth)

### 1. Fixed Navigation Bar

```html
<nav class="fixed">
  - DevConnect Logo & Branding - Navigation Items: Features, Community, About -
  Glassmorphism effect with backdrop blur
</nav>
```

### 2. Main Content Area

```html
<div class="pt-32 pb-20">
  <!-- Padding for fixed nav -->

  <!-- Hero Section -->
  <h1>Connect with Developers Worldwide</h1>
  <p>Platform description...</p>
  <div class="CTA Buttons">- Get Started Free - Learn More</div>

  <!-- Feature Cards Grid (3 columns) -->
  <div class="grid-cols-3">
    <Card emoji="🚀" title="Build Together" />
    <Card emoji="🤝" title="Network & Grow" />
    <Card emoji="💡" title="Share & Learn" />
  </div>

  <!-- Stats Section -->
  <div class="grid-cols-3">
    <Stat value="5000+" label="Active Developers" />
    <Stat value="10K+" label="Connections Made" />
    <Stat value="500+" label="Active Projects" />
  </div>

  <!-- Features List (2 columns) -->
  <div class="grid-cols-2">
    <Feature icon="✓" title="Real-time Collaboration" />
    <Feature icon="✓" title="Professional Network" />
    <Feature icon="✓" title="Knowledge Sharing" />
    <Feature icon="✓" title="Event Management" />
  </div>
</div>
```

### 3. Footer

```html
<footer class="bg-gray-900">
  - DevConnect Branding - 4 Columns: Product, Community, Follow Us, etc. - Links
  to Privacy Policy, Terms of Service - Social Media Links
</footer>
```

---

## Dashboard UI Sections (With Auth)

### Layout Structure

```
┌─────────────────────────────────────────────────┐
│ Layout Component (wraps Dashboard)              │
│ ├─ NavBar (top navigation bar)                  │
│ └─ <Outlet /> → DashboardLanding               │
└─────────────────────────────────────────────────┘
        │
        ↓
┌─────────────────────────────────────────────────┐
│ DashboardLanding (authenticated view)           │
├──────────┬────────────────────┬────────────────┤
│ Column 1 │ Column 2           │ Column 3       │
├──────────┼────────────────────┼────────────────┤
│Sidebar   │ Main Feed          │Sidebar         │
│          │                    │                │
│UserInfo  │ WelcomeBanner      │Activity        │
│          │ ─────────────────  │                │
│MutualPpl │                    │Blogs           │
│          │ Posts (paginated)  │                │
│          │ ─────────────────  │Events          │
│          │ Post 1             │                │
│          │ Post 2             │                │
│          │ Post 3             │                │
│          │ [More...]          │                │
│          │                    │                │
│          │ Pagination Controls│                │
└──────────┴────────────────────┴────────────────┘
```

### Grid System

```jsx
<div class="md:grid md:grid-cols-4">
  {/* Column 1 - User Info Sidebar */}
  <div class="col-span-1">
    <UserInfo />
    <MutualPeople />
  </div>

  {/* Column 2 - Main Feed (spans 2 columns) */}
  <div class="md:col-span-2">
    <WelcomeBanner />
    <Posts
      posts={posts}
      loading={loading}
      currentPage={currentPage}
      totalPages={totalPages}
      fetchPosts={fetchPosts}
      setPosts={setPosts}
    />
  </div>

  {/* Column 3 - Activity Sidebar */}
  <div class="col-span-1">
    <Activity />
    <Blogs />
    <Events />
  </div>
</div>
```

---

## Data Flow Diagram

```
App Component
    │
    ├─ Check: auth?.accessToken
    │
    ├─ YES → Render:
    │   │
    │   ├─ <Layout>
    │   │   └─ NavBar (username, avatar, notifications)
    │   │   └─ <Outlet>
    │   │       └─ <DashboardLanding>
    │   │           ├─ [Dashboard UI]
    │   │           ├─ fetchPosts() via axiosPrivate
    │   │           │   └─ GET /api/posts
    │   │           │       └─ Filter by auth.id + following users
    │   │           └─ setState(posts, loading, pagination)
    │
    └─ NO → Render:
        │
        └─ <DashboardLanding>
            └─ [Landing Page UI]
```

---

## API Integration

### Post Fetching

```javascript
const fetchPosts = async (page = 1) => {
  // Only fetch if user has ID and following list
  if (!auth?.id || !auth?.following) return;

  setLoading(true);
  try {
    // Combine user's own ID with following users
    const userIds = [auth.id, ...auth.following].join(",");

    // API call with authorization
    const response = await axiosPrivate.get(
      `/api/posts?page=${page}&limit=10&userIds=${userIds}`,
      {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      }
    );

    // Update state
    setPosts(response.data.posts);
    setTotalPages(response.data.totalPages);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};
```

---

## Styling Approach

### Color Scheme

- **Primary Gradient**: `from-indigo-600 to-blue-600`
- **Background**: `from-blue-50 to-indigo-100` (light) / `from-gray-900 to-gray-800` (dark)
- **Text**: Gray palette with proper contrast for dark mode

### Responsive Classes

```
Mobile:   No layout grid
Tablet:   md: breakpoint
Desktop:  Full 4-column grid

Hidden Elements:
- Sidebars hidden < md
- Navigation items hidden < md
- Some sections hidden < md
```

### Effects & Animations

```
- Backdrop blur on navigation
- Hover scale transforms
- Smooth scroll behavior
- Gradient text effects
- Shadow transitions
- Border transitions on hover
```

---

## Key Features

✅ **Single Component** - DashboardLanding handles both views  
✅ **Conditional Rendering** - Auth check at top level  
✅ **State Management** - Posts, loading, pagination  
✅ **Auto-load** - Fetches posts on mount if authenticated  
✅ **Responsive** - Mobile-first design  
✅ **Dark Mode** - Full DaisyUI theme support  
✅ **Real-time** - Socket.io context available  
✅ **Error Handling** - Try-catch for API calls

---

## Component Props Flow

```
DashboardLanding
│
├─ Passes to Posts:
│   ├── auth
│   ├── POST_URL
│   ├── setAuth
│   ├── loading
│   ├── currentPage
│   ├── setCurrentPage
│   ├── totalPages
│   ├── fetchPosts (callback)
│   ├── posts
│   └── setPosts
│
├─ Passes to MutualPeople:
│   ├── auth
│   ├── setAuth
│   └── refreshPosts (fetchPosts callback)
│
├─ Passes to UserInfo:
│   └── (reads from auth context)
│
└─ Other components (Activity, Events, Blogs):
    └── (self-contained, read from context)
```

---

## Performance Considerations

- **useEffect Cleanup**: Included ESLint disable with comment
- **Loading State**: Prevents multiple simultaneous requests
- **Pagination**: Limit of 10 posts per page
- **Conditional Fetching**: Only fetch if auth.id exists
- **Early Return**: Graceful handling of missing data

---

## Browser Compatibility

- Modern browsers with ES6+ support
- Tailwind CSS (no IE11 support)
- React 18+
- Socket.io support required for real-time features

---

## Accessibility Features

- Semantic HTML structure
- Proper heading hierarchy (h1 → h3)
- Alt text potential for images
- Keyboard navigation support via buttons
- Color contrast meets WCAG standards
- Focus states on interactive elements
