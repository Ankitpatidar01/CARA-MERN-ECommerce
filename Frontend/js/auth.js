const loginForm = document.getElementById("loginForm");

if(loginForm){

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email =
        document.getElementById("email").value;

        const password =
        document.getElementById("password").value;

        try{

            const response = await fetch(`${API_URL}/api/auth/login`,
                {
                    method:"POST",
                    headers: authHeaders,
                    body:JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if(!response.ok){
                alert(data.message);
                return;
            }

            localStorage.setItem(
                "accessToken",
                data.accessToken
            );

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            if(data.user.role === "admin"){
                window.location.href =
                "admin.html";
            }
            else{
                window.location.href =
                "index.html";
            }

        }
        catch(error){
            console.log(error);
        }

    });

}




const registerBtn = document.getElementById('registerBtn');

if (registerBtn) {

registerBtn.addEventListener('click', async (e) => {

    e.preventDefault();

    const userNameField = document.getElementById('name').value;
    const userEmail = document.getElementById('email').value;
    const userPass = document.getElementById('password').value;

    try {

        const response = await fetch(`${API_URL}/api/auth/register`,
            {
                method: "POST",
                headers: authHeaders,
               body: JSON.stringify({
                    username: userNameField,
                    email: userEmail,
                    password: userPass
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            const errormsg = document.querySelector('.error-msg');
            errormsg.textContent = data.message || "User Already Exists";
            document.getElementById('registerForm').reset();
        } else {
            window.location.href = "login.html";
        }

    } catch (err) {
        console.log(err);
    }

    form.reset();

});

}