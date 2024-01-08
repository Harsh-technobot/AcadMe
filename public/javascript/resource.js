const upvoteBtn = document.querySelector("#upvote-btn");
const upvoteNum = document.querySelector("#upvotes-num");
const downvoteBtn = document.querySelector("#downvote-btn");
const downvoteNum = document.querySelector("#downvotes-num");

upvoteBtn.addEventListener("click", async () => {
  if (!user) {
    alert("You must be logged in to vote.");
    return;
  }

  const res = await fetch(`/resources/${resourceId}/upvote`);
  const data = await res.json();

  if (parseInt(upvoteNum.innerText) < data.newUpvotes) {
    upvoteBtn.classList.add("text-white");
    if (downvoted) {
      downvoteBtn.classList.remove("text-white");
    }
  } else {
    upvoteBtn.classList.remove("text-white");
  }

  if (parseInt(downvoteNum.innerText) < data.newDownvotes) {
    downvoteBtn.classList.add("text-white");
    if (upvoted) {
      upvoteBtn.classList.remove("text-white");
    }
  } else {
    downvoteBtn.classList.remove("text-white");
  }

  upvoteNum.innerText = data.newUpvotes;
  downvoteNum.innerText = data.newDownvotes;
});

downvoteBtn.addEventListener("click", async () => {
  if (!user) {
    alert("You must be logged in to vote.");
    return;
  }

  const res = await fetch(`/resources/${resourceId}/downvote`);

  const data = await res.json();

  if (parseInt(upvoteNum.innerText) < data.newUpvotes) {
    upvoteBtn.classList.add("text-white");
    if (downvoted) {
      downvoteBtn.classList.remove("text-white");
    }
  } else {
    upvoteBtn.classList.remove("text-white");
  }

  if (parseInt(downvoteNum.innerText) < data.newDownvotes) {
    downvoteBtn.classList.add("text-white");
    if (upvoted) {
      upvoteBtn.classList.remove("text-white");
    }
  } else {
    downvoteBtn.classList.remove("text-white");
  }

  upvoteNum.innerText = data.newUpvotes;
  downvoteNum.innerText = data.newDownvotes;
});
