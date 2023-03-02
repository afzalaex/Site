import { useState } from 'react';

function ShareButton() {
  const [showOptions, setShowOptions] = useState(false);
  const [shareUrl, setShareUrl] = useState(window.location.href);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(shareUrl);
  };

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleShareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleShareLinkedin = () => {
    const url = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <button onClick={() => setShowOptions(true)}>Share</button>
      {showOptions && (
        <div id="share-options">
          <p>Copy link:</p>
          <input type="text" value={shareUrl} onChange={(e) => setShareUrl(e.target.value)} />
          <div>
            <button onClick={handleCopyUrl}>Copy</button>
            <button onClick={() => setShowOptions(false)}>Cancel</button>
          </div>
          <p>Share on social media:</p>
          <div>
            <button onClick={handleShareFacebook}>Facebook</button>
            <button onClick={handleShareTwitter}>Twitter</button>
            <button onClick={handleShareLinkedin}>LinkedIn</button>
          </div>
        </div>
      )}
    </>
  );
}

