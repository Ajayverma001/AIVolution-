async function fetchMembers() {
  const res = await fetch("/api/members");
  const members = await res.json();
  const list = document.getElementById("membersList");
  list.innerHTML = "";
  members.forEach(m => {
    const div = document.createElement("div");
    div.className = "member";
    div.textContent = `${m.name}: ${m.email}`;
    list.appendChild(div);
  });
}

document.getElementById("memberForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  await fetch("/api/members", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email })
  });

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  fetchMembers();
});

fetchMembers();