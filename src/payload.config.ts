// // // storage-adapter-import-placeholder
// // import { mongooseAdapter } from '@payloadcms/db-mongodb'
// // import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
// // import { lexicalEditor } from '@payloadcms/richtext-lexical'
// // import path from 'path'
// // import { buildConfig } from 'payload'
// // import { fileURLToPath } from 'url'
// // import sharp from 'sharp'

// // import { Users } from './collections/Users'
// // import { Media } from './collections/Media'
// // import Pages from './collections/Pages'
// // import Navbar from './collections/Navbar'
// // import BlogPosts from './collections/BlogPosts'
// // import Footer from './collections/Footer'

// // import ContactPage from './collections/ContactPage'

// // import ContactSubmissions from './collections/ContactSubmissions'

// // const filename = fileURLToPath(import.meta.url)
// // const dirname = path.dirname(filename)

// // export default buildConfig({
// //   serverURL: 'http://localhost:3000', // optional but good
// //   cors: ['http://localhost:3001'],
// //   admin: {
// //     user: Users.slug,
// //     importMap: {
// //       baseDir: path.resolve(dirname),
// //     },
// //   },
// //   collections: [Navbar, Pages, Users, Media, BlogPosts, ContactSubmissions, Footer, ContactPage],
// //   editor: lexicalEditor(),
// //   secret: process.env.PAYLOAD_SECRET || '',
// //   typescript: {
// //     outputFile: path.resolve(dirname, 'payload-types.ts'),
// //   },
// //   db: mongooseAdapter({
// //     url: process.env.DATABASE_URI || '',
// //   }),
// //   sharp,
// //   plugins: [
// //     payloadCloudPlugin(),
// //     // storage-adapter-placeholder
// //   ],
// // })



// // payload.config.ts
// import { mongooseAdapter } from '@payloadcms/db-mongodb'
// import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
// import { lexicalEditor } from '@payloadcms/richtext-lexical'
// import path from 'path'
// import { buildConfig } from 'payload'
// import { fileURLToPath } from 'url'
// import sharp from 'sharp'

// import { Users } from './collections/Users'
// import { Media } from './collections/Media'
// import Pages from './collections/Pages'
// import Navbar from './collections/Navbar'
// import BlogPosts from './collections/BlogPosts'
// import Footer from './collections/Footer'
// import ContactSubmissions from './collections/ContactSubmissions'

// // ✅ Import as Global
// import ContactPage from './collections/ContactPage'

// const filename = fileURLToPath(import.meta.url)
// const dirname = path.dirname(filename)

// import { CloudinaryAdapter } from 'payload-cloudinary'

// const cloudinary = CloudinaryAdapter({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
//   api_key: process.env.CLOUDINARY_API_KEY!,
//   api_secret: process.env.CLOUDINARY_API_SECRET!,
// })

// export default buildConfig({
//   serverURL: 'https://payload-backs.vercel.app',
//   cors: ['http://localhost:3001', 'https://rebar-x.vercel.app'],
//   admin: {
//     user: Users.slug,
//     importMap: {
//       baseDir: path.resolve(dirname),
//     },
//   },
//   collections: [
//     Navbar,
//     Pages,
//     Users,
//     // Media,
//     {
//       ...Media,
//       upload: {
//         adapter: cloudinary, // ✅ inject here
//       },
//     },
//     BlogPosts,
//     ContactSubmissions, // ✅ Keep as collection
//     Footer,
//   ],
//   globals: [
//     ContactPage, // ✅ Move to globals array
//   ],
//   editor: lexicalEditor(),
//   secret: process.env.PAYLOAD_SECRET || '',
//   typescript: {
//     outputFile: path.resolve(dirname, 'payload-types.ts'),
//   },
//   db: mongooseAdapter({
//     url: process.env.DATABASE_URI || '',
//   }),
//   sharp,
//   plugins: [payloadCloudPlugin()],
// })



// payload.config.ts
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import Pages from './collections/Pages'
import Navbar from './collections/Navbar'
import BlogPosts from './collections/BlogPosts'
import Footer from './collections/Footer'
import ContactSubmissions from './collections/ContactSubmissions'
import ContactPage from './collections/ContactPage'

import SEO from './collections/SEO'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: 'https://rebar-xbackend.vercel.app',
  cors: [
    'http://localhost:3001',
    'http://localhost:3000',
    'https://rebar-x.vercel.app',
    'https://www.rebarx.in',
    'https://rebarx.in',
    process.env.PAYLOAD_PUBLIC_SERVER_URL || 'https://your-app.onrender.com',
  ],
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Navbar,
    Pages,
    Users,
    Media, // Use the basic Media collection for now
    BlogPosts,
    ContactSubmissions,
    Footer,
  ],
  globals: [ContactPage, SEO],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [payloadCloudPlugin()],
})