-- Run in Supabase → SQL Editor. Adjust bucket name if yours differs from the app default
-- (NEXT_PUBLIC_SUPABASE_PORTFOLIO_BUCKET or "portofolio_images").
--
-- Uploads use paths: "<user-uuid>/<timestamp>-<uuid>.<ext>" (see app/admin/actions.ts).

-- Allow authenticated users to INSERT only into their own folder in the bucket.
CREATE POLICY "portfolio_images_insert_own_folder"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'portofolio_images'
  AND name LIKE auth.uid()::text || '/%'
);

-- Allow public reads if the bucket is used with getPublicUrl (typical for portfolio images).
CREATE POLICY "portfolio_images_select_public"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'portofolio_images');

-- Optional: allow users to update/delete their own objects (e.g. replace an image).
CREATE POLICY "portfolio_images_update_own_folder"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'portofolio_images'
  AND name LIKE auth.uid()::text || '/%'
)
WITH CHECK (
  bucket_id = 'portofolio_images'
  AND name LIKE auth.uid()::text || '/%'
);

CREATE POLICY "portfolio_images_delete_own_folder"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'portofolio_images'
  AND name LIKE auth.uid()::text || '/%'
);
