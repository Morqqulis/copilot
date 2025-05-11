export default async function downloadAudioFile(
  audioUrl,
  setIsLoading = (value) => {}
) {
  try {
    setIsLoading(true);
    // Fetch the audio file
    const response = await fetch(audioUrl);

    // Check if the fetch was successful
    if (!response.ok) {
      throw new Error(`Failed to fetch audio: ${response.statusText}`);
    }

    // Get the audio file as a blob
    const blob = await response.blob();

    // Create a link element
    const link = document.createElement("a");

    // Create a URL for the blob and set it as the href for the link
    const url = URL.createObjectURL(blob);
    link.href = url;

    // Set the download attribute with a filename
    link.download = "audio.mp3"; // You can change the filename if needed

    // Append the link to the document
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Clean up and remove the link element
    document.body.removeChild(link);

    // Revoke the blob URL to free up memory
    URL.revokeObjectURL(url);
    setIsLoading(false);
  } catch (error) {
    console.error("Download error:", error);
    setIsLoading(false);
  }
}
