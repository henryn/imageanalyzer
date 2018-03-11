<img src="https://avatars2.githubusercontent.com/u/2810941?v=3&s=96" alt="Google Cloud Platform logo" title="Google Cloud Platform" align="right" height="96" width="96"/>

# Google Cloud Functions Analyze Image Example

This sample shows you how to analyze an image for inappropriate content in a
Storage-triggered Cloud Function.


## Deploy and Test


1. In the cloud shell command line, clone this repository.

        git clone https://github.com/henryn/imageanalyzer.git
        cd imageanalyzer

2. Create a cloud storage bucket. This storage bucket is used to upload images for the function to check.  Replace YOUR_BUCKET_NAME with the name of the bucket.  Bucket names must be globally unique, so you may want to use your project id as your bucket name.

        gsutil mb gs://YOUR_BUCKET_NAME

3. Deploy the AnalyzeImage function with a Storage trigger.  Replace YOUR_BUCKET_NAME with the name of the bucket you created in the previous step.  This may take up to 5 minutes for the code to be deployed.

        gcloud beta functions deploy AnalyzeImage --trigger-bucket=YOUR_BUCKET_NAME

4. Upload an offensive image to the Storage bucket, such as this image of a flesh-eating zombie: 

        gsutil cp zombie-949916_1280.jpg gs://YOUR_BUCKET_NAME

5. Check the logs for the AnalyzeImage function:

        gcloud beta functions logs read AnalyzeImage

You should see something like this in your console:

        AnalyzeImage  ...  Adult: VERY_UNLIKELY
        AnalyzeImage  ...  Spoof: VERY_UNLIKELY
        AnalyzeImage  ...  Medical: VERY_UNLIKELY
        AnalyzeImage  ...  Violence: VERY_LIKELY

