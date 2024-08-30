export async function signup({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) {
  const res = await fetch("https://skypro-music-api.skyeng.tech/user/signup/", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
      username: username,
    }),
    headers: {
      // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
      "content-type": "application/json",
    },
  });
  if (!res.ok) {
      throw new Error("Ошибка");
    }
    const data = await res.json();
    return data;
}