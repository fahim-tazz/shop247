# Take-home Assessment Submission – Fahim Tajwar

Please find the deployed version of this project at [https://shop247-541241438834.asia-southeast1.run.app](https://shop247-541241438834.asia-southeast1.run.app)
(Optimized for landscape devices)

## Quick Start Guide

### Assignment 1: Static HTML Page

This portion of the assignment contains a simple static HTML page. It uses only HTML and CSS, with no JavaScript interactivity.

- Navigate to the folder
- Open the `index.html` file in your browser to view the static page.

### Assignment 2: E-commerce Web App

This is an e-commerce application built with React and Redux.

#### Local Development Setup:

- Navigate to the project directory:
  ```bash
  cd ensign/shopping
  ```
- Install dependencies:
  ```bash
  npm ci
  ```
- Start the development server:
  ```bash
  npm run dev
  ```

## Technical Documentation

### Page Structure and Components

#### 1. Home Page – `/`

- **Components**:
  - `Header`: Displays the logo, search bar, and cart icon.
  - `FilterBar`: Contains categorical filter options like product category and origin country.
  - `SearchBar`: Allows keyword-based searching.
  - `ProductGrid`: Renders filtered products in a responsive grid.
    - `ProductCard`: Displays individual product details (image, title, price, rating, origin).

#### 2. Product Page – `/products/{id}`

- **Sections**:
  - Product Image and Details: Fetch and display detailed info about a product.
  - Quantity Selector: Controls to increase/decrease item quantity.
  - Add to cart Button: Adds selected quantity to the cart (dispatches to Redux `cartSlice`).

#### 3. Cart Page – `/cart`

- **Layout**:
  - Left: Scrollable list of cart items.
  - Right: Order summary and shipping form.
- **Components**:
  - `CartProductCard`: Shows each item in the cart with quantity controls.
  - `OrderSummary`: Shows subtotal, GST (9%), delivery fee ($2.99), and total.
  - `ShippingForm`: Collects name, phone, address, and payment info. **This is a placeholder, and has no input validation.**
  - `PlaceOrderButton`: Simulates placing an order. Clears the cart and shows a toast message on success, throws an error if cart is empty, then redirects back to home page.

---

### State Management

This project uses Redux for centralized state management. All global state is kept in slices:

- **Product Slice**: Caches the entire product list after fetching once from the FakeStoreAPI to avoid repeated API calls. This is acceptable here since the API data is static. In case of rapidly changing data sources, we would have to implement a cache expiry timestamp and re-fetch upon cache expiry.
- **Filter Slice**: Stores the state of all category and origin filters using `Record<string, boolean>`. Each filter is a Record, with each key being the possible attribute, and the value being True/False.
- **Cart Slice**: Manages cart contents using a dictionary keyed by `product.id`. Each value stores the `product` object and its `quantity`.

To persist cart data across sessions:

- The cart slice is synced to `localStorage` via a `store.subscribe()` at 500ms intervals.
- On app load, the initial Redux state is hydrated from `localStorage` by the `CartHydrator` component if available.

---

### Search and Filtering

- The project scope is limited to the frontend, therefore, all filtering and search logic is handled on the frontend.
- Filters:
  - Two categorical filters: `category` and `origin`, stored in Redux store.
  - Boolean-based filtering logic evaluates active filter keys.
  - Upon fetching the list of products, the filter states are populated with all the unique attribute values for each kind of filter (e.g. Men's Clothing, Jewellery for `category`).
  - Initially, for each filter, all attributes are set to `false`. When all attributes are `false`, no filtering is done. If one or more attributes are `true` (set using the checkboxes on the left), only products with those attributes are shown (union of attributes for each filter).
- Search:
  - Case-insensitive match on `title` and `description` of products.
  - If a query is present, filtered results are further narrowed by the match.
- **Scalability Note**:
  - This in-memory approach is not scalable for large data (e.g., 10,000+ products).
  - A scalable version would require:
    - Backend filtering/searching using indexed database queries.
    - Pagination to load products incrementally.
    - Pagination would mean that we cannot correctly filter/search on the frontend, hence, backend API should handle search, filter and pagination (currently unavailable in fakestoreapi.com).

---

### Responsive Design

- The layout uses `flex`, `grid`, and `clamp`-based sizing to scale UI components.
- TailwindCSS utility classes ensure consistent styling across screen sizes.
- Font sizes, card sizes, and spacing are all relative to screen width using `rem` or percentages.
- Optimized for **landscape devices**; tested up to 4K resolution.
- Cards and grids stretch with screen size rather than being container-constrained.
- Loading and empty states are included to allow smooth transition when fetching from external APIs.

---

### Testing

This project includes automated tests written using Jest and React Testing Library.

- **Cart Page (`/cart`)**:

  - We tested both empty and non-empty cart scenarios.
  - The integration tests verify rendering of product titles, order summaries, and calculated totals.

- **CartProductCard Component**:

  - Validates that product titles, images, prices, and quantities render correctly.
  - Tests the increment/decrement buttons to ensure they dispatch correct Redux actions to update quantity.

- **OrderSummary Component**:
  - Ensures subtotal, GST (9%), delivery fee, and total amounts are calculated and displayed correctly.
  - Tests both populated and empty cart states, ensuring correct values are rendered and that the delivery fee is only shown when cart is not empty.

# Take-home Assessment Submission – Fahim Tajwar

Please find the deployed version of this project at [https://shop247-541241438834.asia-southeast1.run.app](https://shop247-541241438834.asia-southeast1.run.app)
(Optimized for landscape devices)

## Quick Start Guide

### Assignment 1: Static HTML Page

This portion of the assignment contains a simple static HTML page. It uses only HTML and CSS, with no JavaScript interactivity.

- Navigate to the folder
- Open the `index.html` file in your browser to view the static page.

### Assignment 2: E-commerce Web App

This is an e-commerce application built with React and Redux.

#### Local Development Setup:

- Navigate to the project directory:
  ```bash
  cd ensign/shopping
  ```
- Install dependencies:
  ```bash
  npm ci
  ```
- Start the development server:
  ```bash
  npm run dev
  ```

## Technical Documentation

### Page Structure and Components

#### 1. Home Page – `/`

- **Components**:
  - `Header`: Displays the logo, search bar, and cart icon.
  - `FilterBar`: Contains categorical filter options like product category and origin country.
  - `SearchBar`: Allows keyword-based searching.
  - `ProductGrid`: Renders filtered products in a responsive grid.
    - `ProductCard`: Displays individual product details (image, title, price, rating, origin).

#### 2. Product Page – `/products/{id}`

- **Sections**:
  - Product Image and Details: Fetch and display detailed info about a product.
  - Quantity Selector: Controls to increase/decrease item quantity.
  - Add to cart Button: Adds selected quantity to the cart (dispatches to Redux `cartSlice`).

#### 3. Cart Page – `/cart`

- **Layout**:
  - Left: Scrollable list of cart items.
  - Right: Order summary and shipping form.
- **Components**:
  - `CartProductCard`: Shows each item in the cart with quantity controls.
  - `OrderSummary`: Shows subtotal, GST (9%), delivery fee ($2.99), and total.
  - `ShippingForm`: Collects name, phone, address, and payment info. **This is a placeholder, and has no input validation.**
  - `PlaceOrderButton`: Simulates placing an order. Clears the cart and shows a toast message on success, throws an error if cart is empty, then redirects back to home page.

---

### State Management

This project uses Redux for centralized state management. All global state is kept in slices:

- **Product Slice**: Caches the entire product list after fetching once from the FakeStoreAPI to avoid repeated API calls. This is acceptable here since the API data is static. In case of rapidly changing data sources, we would have to implement a cache expiry timestamp and re-fetch upon cache expiry.
- **Filter Slice**: Stores the state of all category and origin filters using `Record<string, boolean>`. Each filter is a Record, with each key being the possible attribute, and the value being True/False.
- **Cart Slice**: Manages cart contents using a dictionary keyed by `product.id`. Each value stores the `product` object and its `quantity`.

To persist cart data across sessions:

- The cart slice is synced to `localStorage` via a `store.subscribe()` at 500ms intervals.
- On app load, the initial Redux state is hydrated from `localStorage` by the `CartHydrator` component if available.

---

### Search and Filtering

- The project scope is limited to the frontend, therefore, all filtering and search logic is handled on the frontend.
- Filters:
  - Two categorical filters: `category` and `origin`, stored in Redux store.
  - Boolean-based filtering logic evaluates active filter keys.
  - Upon fetching the list of products, the filter states are populated with all the unique attribute values for each kind of filter (e.g. Men's Clothing, Jewellery for `category`).
  - Initially, for each filter, all attributes are set to `false`. When all attributes are `false`, no filtering is done. If one or more attributes are `true` (set using the checkboxes on the left), only products with those attributes are shown (union of attributes for each filter).
- Search:
  - Case-insensitive match on `title` and `description` of products.
  - If a query is present, filtered results are further narrowed by the match.
- **Scalability Note**:
  - This in-memory approach is not scalable for large data (e.g., 10,000+ products).
  - A scalable version would require:
    - Backend filtering/searching using indexed database queries.
    - Pagination to load products incrementally.
    - Pagination would mean that we cannot correctly filter/search on the frontend, hence, backend API should handle search, filter and pagination (currently unavailable in fakestoreapi.com).

---

### Responsive Design

- The layout uses `flex`, `grid`, and `clamp`-based sizing to scale UI components.
- TailwindCSS utility classes ensure consistent styling across screen sizes.
- Font sizes, card sizes, and spacing are all relative to screen width using `rem` or percentages.
- Optimized for **landscape devices**; tested up to 4K resolution.
- Cards and grids stretch with screen size rather than being container-constrained.

---

### Testing

This project includes automated tests written using Jest and React Testing Library.

- **Cart Page (`/cart`)**:

  - We tested both empty and non-empty cart scenarios.
  - The integration tests verify rendering of product titles, order summaries, and calculated totals.

- **CartProductCard Component**:

  - Validates that product titles, images, prices, and quantities render correctly.
  - Tests the increment/decrement buttons to ensure they dispatch correct Redux actions to update quantity.

- **OrderSummary Component**:
  - Ensures subtotal, GST (9%), delivery fee, and total amounts are calculated and displayed correctly.
  - Tests both populated and empty cart states, ensuring correct values are rendered and that the delivery fee is only shown when cart is not empty.

### Limitations

- No authentication or user management is implemented. The focus was on making a frictionless shopping experience (filling up forms unless absolutely necessary during checkout)
- Shipping form inputs are placeholders with no validation on the inputs. However, it does not allow order placement with an empty cart.

### Deployment

This project is deployed on **Google Cloud Run** using the official buildpacks. The deployment process builds the app with `npm run build` and serves it with `npm start`. The app is publicly accessible and optimized for modern browsers.

Visit the deployed version at: [https://shop247-541241438834.asia-southeast1.run.app](https://shop247-541241438834.asia-southeast1.run.app)
