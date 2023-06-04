async function newReviewHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="review-title"]').value;
    const review_details = document.querySelector('input[name="review-details"]').value;

    const response = await fetch(`api/reviews`, {
        method: 'POST',
        body: JSON.stringify(
            {
              title,
              review_details 
            }),
            headers: {
                'Content-Type': 'application/json'
            }
    });

    if (response.ok) {
        document.location.replace('/profile/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-review-form').addEventListener('submit', newReviewHandler);