const update = document.querySelector("#update-button");
const deleteButton = document.querySelector("#delete-button");

update.addEventListener("click", _ => {
  fetch("/quotes", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Tony Robbins",
      quote:
        "Identify your problems, but give your power and energy to solutions.",
    }),
  })
    .then(res => {
      if (res.ok) return res.json();
    })
    .then(response => {
      window.location.reload(true);
    });
});

deleteButton.addEventListener("click", _ => {
  fetch("/quotes", {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Tony Robbins",
    }),
  })
    .then(res => {
      if (res.ok) return res.json();
    })
    .then(data => {
      window.location.reload();
    });
});
