# WishList

Wish List is a web application inspired by rewish.io, designed to help users curate and share their personalized wish lists with ease.
Whether you’re planning a shopping list, a gift registry, or simply keeping track of products you admire, Wish List provides a seamless experience for organizing and sharing your favorite items.

🌟 Core Functionality

Add Products via URL: Paste a product URL (e.g., from online stores or marketplaces) into the input field,
and the app will fetch metadata like the product's title and image using Open Graph (og:title, og:image) tags.
Interactive Product Cards: Display fetched metadata as visually appealing product cards in your wish list.
Edit and Remove: Update the product URL to fetch new metadata or remove items from your list.
Add Unlimited Products: Expand your wish list with as many items as you like.

👥 User Accounts and Authentication

Google Login: Secure login using Firebase Authentication with support for Google accounts.  
Guest Mode: Use the app without an account and later merge your guest list with a registered account.

🔄 Backend Integration

Cloud-Backed Storage: Save your wish list to Firebase Firestore, ensuring your data is available across devices.

📤 Share with Others

View-Only Sharing: Generate a shareable link to allow others to view your wish list without editing it.

🚀 Get Started

Clone the repository:

```git clone https://github.com/your-repo/wish-list.git```  
```cd wish-list```

Install dependencies:

```npm install```

Run the app:

```npm start```

🛠️ Technologies Used

Frontend: Angular 19.0.6  
Backend: Firebase (Firestore, Authentication)

✨ Contributing

We welcome contributions! If you’d like to report a bug or propose a feature, feel free to open an issue or submit a pull request.

📄 License

This project is licensed under the MIT License.
