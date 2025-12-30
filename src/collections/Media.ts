// // import type { CollectionConfig } from 'payload'

// // export const Media: CollectionConfig = {
// //   slug: 'media',
// //   access: {
// //     read: () => true,
// //   },
// //   fields: [
// //     {
// //       name: 'alt',
// //       type: 'text',
// //       required: true,
// //     },
// //   ],
// //   upload: true,
// // }

// // working

// // collections/Media.ts - Simple working version
// import type { CollectionConfig } from 'payload'
// import { uploadToCloudinary } from '../utils/cloudinary'

// export const Media: CollectionConfig = {
//   slug: 'media',
//   access: {
//     read: () => true,
//   },
//   fields: [
//     {
//       name: 'alt',
//       type: 'text',
//       required: true,
//     },
//     {
//       name: 'caption',
//       type: 'text',
//     },
//     {
//       name: 'cloudinaryUrl',
//       type: 'text',
//       admin: {
//         readOnly: true,
//       },
//     },
//   ],
//   upload: {
//     staticDir: 'media',
//     adminThumbnail: ({ doc }) => {
//       return (doc as any).cloudinaryUrl || `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/media/${(doc as any).filename}` || null
//     },
//     imageSizes: [
//       {
//         name: 'thumbnail',
//         width: 400,
//         height: 300,
//         position: 'centre',
//       },
//       {
//         name: 'card',
//         width: 768,
//         height: 1024,
//         position: 'centre',
//       },
//       {
//         name: 'tablet',
//         width: 1024,
//         height: undefined,
//         position: 'centre',
//       },
//     ],
//     // adminThumbnail: 'thumbnail',
//     mimeTypes: ['image/*'],
//   },
//   hooks: {
//     afterChange: [
//       async ({ doc, req, operation }) => {
//         if (operation === 'create' && doc.filename) {
//           try {
//             console.log('🔄 Processing upload for:', doc.filename)

//             // Get the file from the request
//             // const file = req.files?.file || req.file

//             const file = (req as any).files?.file || req.file

//             if (file && file.data) {
//               console.log('📁 File data found, uploading to Cloudinary...')

//               // Upload to Cloudinary
//               const result = await uploadToCloudinary(file.data, doc.filename)

//               // Update the document with Cloudinary URL
//               await req.payload.update({
//                 collection: 'media',
//                 id: doc.id,
//                 data: {
//                   cloudinaryUrl: result.secure_url,
//                 },
//                 req, // Pass the request object
//               })

//               console.log('✅ Document updated with Cloudinary URL')
//             } else {
//               console.log('⚠️ No file data found in request')
//             }
//           } catch (error) {
//             console.error('❌ Error in afterChange hook:', error)
//           }
//         }
//       },
//     ],
//   },
// }

import type { CollectionConfig } from 'payload'
import { uploadToCloudinary } from '../utils/cloudinary'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
    {
      name: 'cloudinaryUrl',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
  ],
  upload: {
    // CRITICAL: Disable staticDir for Vercel
    disableLocalStorage: true,
    adminThumbnail: ({ doc }) => {
      return (doc as any).cloudinaryUrl || null
    },
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
      },
    ],
    mimeTypes: ['image/*'],
  },
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        // Handle file upload BEFORE the document is created
        if (req.file) {
          try {
            console.log('🔄 Processing upload in beforeChange:', req.file.name)

            // Upload to Cloudinary using the file buffer
            const result = await uploadToCloudinary(req.file.data, req.file.name)

            // Set the Cloudinary URL in the data before saving
            data.cloudinaryUrl = result.secure_url

            console.log('✅ Cloudinary URL set:', result.secure_url)
          } catch (error) {
            console.error('❌ Error uploading to Cloudinary:', error)
            throw error // This will prevent the document from being created
          }
        }

        return data
      },
    ],
  },
}