# WEB103 Prework - Creatorverse

Submitted by: Joshua Holguin

About this web app:

**Creatorverse** is a small CRUD React app for cataloging YouTube/TikTok creators. It uses **Supabase** (Postgres) for data and **React Router** for navigation. On the home page you’ll see all creators as responsive cards (image, name, description, links). From there you can:

- **View** details (`/creators/:id`) via the “More Details” button  
- **Add** a creator (`/creators/new`) with name, URL, description, and optional imageURL  
- **Edit** a creator (`/creators/:id/edit`)  
- **Delete** a creator with a confirmation prompt


Time spent: 12 hours

## Required Features

The following **required** functionality is completed:

<!-- 👉🏿👉🏿👉🏿 Make sure to check off completed functionality below -->
- ✅ **A logical component structure in React is used to create the frontend of the app**
- ✅ **At least five content creators are displayed on the homepage of the app**
- ✅ **Each content creator item includes their name, a link to their channel/page, and a short description of their content**
- ✅ **API calls use the async/await design pattern via Axios or fetch()**
- ✅ **Clicking on a content creator item takes the user to their details page, which includes their name, url, and description**
- ✅ **Each content creator has their own unique URL**
- ✅ **The user can edit a content creator to change their name, url, or description**
- ✅ **The user can delete a content creator**
- ✅ **The user can add a new content creator by entering a name, url, or description and then it is displayed on the homepage**

The following **optional** features are implemented:

- [ ] Picocss is used to style HTML elements
- [ ] The content creator items are displayed in a creative format, like cards instead of a list
- [ ] An image of each content creator is shown on their content creator card

The following **additional** features are implemented:


* [ ] List anything else that you added to improve the site's functionality!

## Video Walkthrough

Here's a walkthrough of implemented required features:

![demo2](https://github.com/user-attachments/assets/2cb9b742-78a6-464c-81fb-baeb7cd6d41b)

<!-- Replace this with whatever GIF tool you used! -->
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

Describe any challenges encountered while building the app or any additional context you'd like to add.

- Supabase env + client: Wrong var names/exports → fixed with VITE_SUPABASE_URL/ANON_KEY and export default supabase.

- Data not showing: Added useEffect fetch + loading/error/empty UI; passed props from App.jsx.

- List not updating after edits: Re-fetch on mutate or use React Query/SWR (future).

- Routing: Wired “More Details” via Link to="/creators/:id"; useParams on detail page.

- Forms & validation: Basic required fields, URL check, inline error messages.

- Images & layout: Prefer hosted URLs/Supabase Storage; object-cover for consistent cards.

## License

Copyright 2025 Joshua Holguin

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
