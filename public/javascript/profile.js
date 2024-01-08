const avatar = document.getElementById("avatar");
const avatarPreview = document.getElementById("avatar-preview");

avatar.addEventListener("change", () => {
  const file = avatar.files[0];
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    if (reader.result) {
      avatarPreview.src = reader.result;
    }
  });
  reader.readAsDataURL(file);
});
