<template>
    <div class="contact-container">
        <div class="first-content">
            <h1>Let’s Work Together</h1>
            <span>Have a project in mind? I’d love to hear about it.</span>
        </div>
        <div class="second-content">
            <div class="left">
                <div class="headings">
                    <h2>Get in Touch</h2>
                    <span>Need help? Start a live chat or contact me:</span>
                </div>
                <div class="info">
                    <div class="email">
                        <div class="outline"><ion-icon name="mail-outline" class="info-icon"></ion-icon></div>
                        <div class="info-details">
                            <h3>Email</h3>
                            <span>orentgultiano11@gmail.com</span>
                        </div>
                    </div>
                    <div class="phone">
                        <div class="outline"><ion-icon name="call-outline" class="info-icon"></ion-icon></div>
                        <div class="info-details">
                            <h3>Phone</h3>
                            <span>+63 995-614-0268</span>
                        </div>
                    </div>
                    <div class="address">
                        <div class="outline"><ion-icon name="location-outline" class="info-icon"></ion-icon></div>
                        <div class="info-details">
                            <h3>Address</h3>
                            <span>Davao City, PH</span>
                        </div>
                    </div>
                </div>
                <div class="logo">
                    <h3>Visit my profile</h3>
                    <div class="socials">
                        <a href="https://www.facebook.com/kurimaws214" target="_blank" rel="noopener noreferrer"
                            class="social">
                            <ion-icon name="logo-facebook" class="social-icons"></ion-icon>
                        </a>
                        <a href="https://github.com/orent143" target="_blank" rel="noopener noreferrer"
                            class="social">
                            <ion-icon name="logo-github" class="social-icons"></ion-icon>
                        </a>
                        <a href="https://github.com/orent143" target="_blank" rel="noopener noreferrer"
                            class="social">
                            <ion-icon name="logo-linkedin" class="social-icons"></ion-icon>
                        </a>
                    </div>
                </div>
            </div>
            <div class="right">
                <h2>Fill out form:</h2>
                <div class="input-container">
                    <input type="Name" placeholder="Name" class="input-field" />
                    <input type="Email" placeholder="Email" class="input-field" />
                </div>
                <div class="subject">
                    <input type="text" placeholder="Subject" class="subject-field" />
                </div>
                <div class="message">
                    <textarea placeholder="Your Message" class="message-field"></textarea>
                </div>
                <div class="submit">
                    <button class="submit-btn">Submit</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
</script>
<style>
.contact-container {
    display: flex;
    flex-direction: column;
    gap: 50px;
    align-items: center;
    padding: 10px 250px;
}

.first-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.first-content h1 {
    font-size: 40px;
    font-weight: bold;
    color: #717171;
}

.first-content span {
    font-size: 30px;
    color: #999999a4;
}

.second-content {
    display: flex;
    border-radius: 10px;
    width: 80%;
    box-shadow: 0px 1px 2px 0px rgba(164, 172, 185, .24), 0px 0px 0px 1px rgba(18, 55, 105, .08);
}

.left {
    width: 50%;
    background-color: #020617;
    padding: 50px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}

.headings {
    display: flex;
    flex-direction: column;
    color: #fffdfd;
}

.headings h2 {
    font-size: 30px;
    font-weight: bold;
    color: #fffdfd;
}

.headings span {
    font-size: 15px;
    color: #fffdfd;
    margin-top: 0px;
}

.info {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
}

.info .email,
.info .phone,
.info .address {
    display: flex;
    gap: 15px;
    align-items: center;
}

.info .outline {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: transparent;
    box-shadow: 0px 1px 2px 0px rgba(164, 172, 185, 0.849), 0px 0px 0px 1px rgba(255, 255, 255, 0.753);
    display: flex;
    align-items: center;
    justify-content: center;
}

.info .info-icon {
    color: #fffdfd;
    font-size: 15px;
    align-items: center;
}

.info .info-details h3 {
    gap: 0;
    font-size: 15px;
    color: #fffdfd;
}

.info .info-details span {
    font-size: 14px;
    gap: 0px;
    color: #fffdfd;
}

.logo {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
}

.logo h3 {
    font-size: 15px;
    color: #fffdfd;
    margin-bottom: 10px;
}

.socials {
    display: flex;
    gap: 20px;
}
.social {
    text-decoration: none;
    display: inline-flex;
    align-items: center;
}
.social-link {
    text-decoration: none;
    display: inline-flex;
}
.social-icons {
    color: #ffffff;
    padding: 5px;
    width: 34px;
    height: 34px;
    background-color: transparent;
    border-radius: 50%;
    transition: 0.3s ease;
}
.social-icons:hover {
    color: #020617;
    background-color: #ffffff;
    font-weight: bold;
    border-radius: 50%;
    transform: translateY(-3px);
}

.right {
    width: 50%;
    padding: 50px;
    display: flex;
    flex-direction: column;
    gap: 30px;
}
.right h2 {
    font-size: 30px;
    font-weight: bold;
    color: #333333;
    margin-bottom: 0px;
}
.input-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}

.input-field {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0px 1px 2px 0px rgba(164, 172, 185, .24), 0px 0px 0px 1px rgba(18, 55, 105, .08);
    font-size: 15px;
    background-color: #fffdfd;
    color: #717171;
    font-family: "Archivo", Helvetica, Arial, sans-serif;
}

.subject-field {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0px 1px 2px 0px rgba(164, 172, 185, .24), 0px 0px 0px 1px rgba(18, 55, 105, .08);
    font-size: 15px;
    background-color: #fffdfd;
    color: #717171;
    font-family: "Archivo", Helvetica, Arial, sans-serif;
}

.message-field {
    width: 100%;
    height: 100px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0px 1px 2px 0px rgba(164, 172, 185, .24), 0px 0px 0px 1px rgba(18, 55, 105, .08);
    font-size: 15px;
    background-color: #fffdfd;
    resize: none;
    color: #717171;
    font-family: "Archivo", Helvetica, Arial, sans-serif;
}

.submit {
    width: 100%;
}

.submit-btn {
    width: 100%;
    padding: 13px;
    background-color: #020617;
    color: #fff;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 1px 2px 0px rgba(164, 172, 185, .24), 0px 0px 0px 1px rgba(18, 55, 105, .08);
    cursor: pointer;
    font-size: 15px;
    font-family: "Archivo", Helvetica, Arial, sans-serif;
    transition: 0.3s ease;
}

.submit-btn:hover {
    background-color: #999999a4;
    color: #020617;
    font-weight: bold;
    font-size: 16px;
}

/* ---- Responsive ---- */
@media (max-width: 1024px) {
  .contact-container {
    padding: 10px 40px;
  }

  .second-content {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .contact-container {
    padding: 10px 20px;
  }

  .first-content h1 {
    font-size: 28px;
  }

  .first-content span {
    font-size: 18px;
    text-align: center;
  }

  .second-content {
    flex-direction: column;
    width: 100%;
  }

  .left {
    width: 100%;
    padding: 30px;
    border-radius: 10px 10px 0 0;
    box-sizing: border-box;
  }

  .right {
    width: 100%;
    padding: 30px;
    box-sizing: border-box;
  }

  .right h2 {
    font-size: 22px;
  }

  .input-container {
    grid-template-columns: 1fr;
  }
}
</style>