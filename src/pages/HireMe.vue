<template>
    <div class="hire-me-container">
        <div class="hire-header">
            <h1>Hire me for your next project.</h1>
            <p class="subtitle">Tell me about your project and how I can help</p>
        </div>

        <div class="hire-content">
            <form @submit.prevent="submitForm" class="hire-form">
                <div class="form-section">
                    <h2>Your Information</h2>

                    <div class="form-group">
                        <label for="name">Full Name *</label>
                        <input id="name" v-model="formData.name" type="text" placeholder="John Doe" required />
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="email">Email Address *</label>
                            <input id="email" v-model="formData.email" type="email" placeholder="john@example.com"
                                required />
                        </div>
                        <div class="form-group">
                            <label for="phone">Phone Number</label>
                            <input id="phone" v-model="formData.phone" type="tel" placeholder="+1 (555) 000-0000" />
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="company">Company / Organization</label>
                        <input id="company" v-model="formData.company" type="text" placeholder="Your Company" />
                    </div>
                </div>
            </form>

            <div class="info-card">
                <h3>Quick Info</h3>
                <div class="info-item">
                    <ion-icon name="time-outline"></ion-icon>
                    <div>
                        <p class="label">Response Time</p>
                        <p class="value">Usually within 24 hours</p>
                    </div>
                </div>
                <div class="info-item">
                    <ion-icon name="location-outline"></ion-icon>
                    <div>
                        <p class="label">Location</p>
                        <p class="value">{{ profile?.location || 'Available Globally' }}</p>
                    </div>
                </div>
                <div class="info-item">
                    <ion-icon name="mail-outline"></ion-icon>
                    <div>
                        <p class="label">Email</p>
                        <p class="value">{{ profile?.email_link || 'contact@example.com' }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="fillout-form-section">
            <h2>Project Details</h2>
            <div class="fillout-form-section-content">
                <div class="left-section">
                    <div class="form-group">
                        <label for="projectTitle">Project Title *</label>
                        <input id="projectTitle" v-model="formData.projectTitle" type="text"
                            placeholder="What is your project called?" required />
                    </div>

                    <div class="form-group">
                        <label>Project Type *</label>
                        <div class="radio-group">
                            <label class="radio-option" v-for="type in projectTypes" :key="type">
                                <input v-model="formData.projectType" type="radio" :value="type" />
                                <span>{{ type }}</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="right-section">
                    <div class="form-group">
                        <label for="budget">Budget Range</label>
                        <select id="budget" v-model="formData.budget">
                            <option value="">Select a budget range</option>
                            <option value="under-5k">Under $5,000</option>
                            <option value="5k-10k">$5,000 - $10,000</option>
                            <option value="10k-25k">$10,000 - $25,000</option>
                            <option value="25k-50k">$25,000 - $50,000</option>
                            <option value="50k+">$50,000+</option>
                            <option value="flexible">Flexible / TBD</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="timeline">Timeline *</label>
                        <select id="timeline" v-model="formData.timeline" required>
                            <option value="">Select a timeline</option>
                            <option value="asap">ASAP (Next 2 weeks)</option>
                            <option value="month">Within a Month</option>
                            <option value="2-3months">2-3 Months</option>
                            <option value="flexible">Flexible</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="description">Project Description *</label>
                        <textarea id="description" v-model="formData.description"
                            placeholder="Describe your project, goals, and what you're looking for..." rows="6"
                            required></textarea>
                    </div>

                    <div class="form-group">
                        <label for="additional">Additional Information</label>
                        <textarea id="additional" v-model="formData.additional"
                            placeholder="Any other details, references, or attachments links..." rows="4"></textarea>
                    </div>
                </div>
            </div>
        </div>
        <label class="checkbox-option">
            <input v-model="formData.agreeTerms" type="checkbox" required />
            <span>I agree to be contacted about this project</span>
        </label>

        <button type="submit" class="submit-btn" :disabled="isSubmitting">
            <span v-if="!isSubmitting">Send Inquiry</span>
            <span v-else>
                <ion-icon name="hourglass-outline" class="spinner"></ion-icon>
                Sending...
            </span>
        </button>

        <p v-if="submitMessage" :class="['submit-message', submitStatus]">
            {{ submitMessage }}
        </p>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "@/lib/supabase";
import emailjs from "@emailjs/browser";

const profile = ref(null);
const isSubmitting = ref(false);
const submitMessage = ref("");
const submitStatus = ref("");

const projectTypes = [
    "Web Development",
    "Mobile App",
    "E-commerce",
    "UI/UX Design",
    "Consulting",
    "Other",
];

const formData = ref({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectTitle: "",
    projectType: "",
    budget: "",
    timeline: "",
    description: "",
    additional: "",
    agreeTerms: false,
});

const fetchProfile = async () => {
    const { data, error } = await supabase
        .from("profile")
        .select("*")
        .limit(1)
        .single();

    if (!error) {
        profile.value = data;
    }
};

const submitForm = async () => {
    isSubmitting.value = true;
    submitMessage.value = "";

    try {
        // Send email via EmailJS
        await emailjs.send(
            "service_9a1o0lj",
            "template_15u6p2c",
            {
                to_email: profile.value?.email_link || "your-email@example.com",
                from_name: formData.value.name,
                from_email: formData.value.email,
                phone: formData.value.phone,
                company: formData.value.company,
                project_title: formData.value.projectTitle,
                project_type: formData.value.projectType,
                budget: formData.value.budget,
                timeline: formData.value.timeline,
                description: formData.value.description,
                additional: formData.value.additional,
                message: `New hire inquiry from ${formData.value.name}`,
            },
            "0Bz9CJy_FhCKQo4Eq"
        );

        submitMessage.value =
            "✓ Your inquiry has been sent successfully! I'll get back to you soon.";
        submitStatus.value = "success";

        // Reset form
        formData.value = {
            name: "",
            email: "",
            phone: "",
            company: "",
            projectTitle: "",
            projectType: "",
            budget: "",
            timeline: "",
            description: "",
            additional: "",
            agreeTerms: false,
        };
    } catch (error) {
        console.error("Error sending email:", error);
        submitMessage.value =
            "✗ There was an issue sending your inquiry. Please try again or contact me directly.";
        submitStatus.value = "error";
    } finally {
        isSubmitting.value = false;

        // Clear message after 5 seconds
        setTimeout(() => {
            submitMessage.value = "";
        }, 5000);
    }
};

onMounted(() => {
    fetchProfile();
});
</script>

<style scoped>
.hire-me-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 40px 20px;
}

.hire-header {
    margin-bottom: 50px;
}

.back-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #6b7280;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 20px;
    transition: color 0.2s ease;
}

.back-btn:hover {
    color: #1f2937;
}

.hire-header h1 {
    font-size: 36px;
    font-weight: 600;
    color: #1f2937;
    margin: 0 0 10px 0;
}

.subtitle {
    font-size: 16px;
    color: #6b7280;
    margin: 0;
}

.hire-content {
    display: grid;
    grid-template-columns: 1fr 380px;
    gap: 40px;
}

.hire-form {
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.fillout-form-section {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.fillout-form-section-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.left-section {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.right-section {
    display: flex;
    flex-direction: column;
    gap: 20px;
}


.form-section h2 {
    display: flex;
    font-size: 18px;
    font-weight: 600;
    color: #1f2937;
    gap: 20px;
    margin: 0 0 20px 0;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.form-group label {
    font-size: 14px;
    font-weight: 500;
    color: #000000;
}

.form-group option {
    font-size: 14px;
    font-weight: 400;
    color: #373737;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.form-group input,
.form-group select,
.form-group textarea {
    padding: 12px 14px;
    border: 1.5px solid #e5e7eb;
    border-radius: 8px;
    font-size: 14px;
    font-family: inherit;
    transition: border-color 0.2s ease;
    background-color: #ffffff;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    outline: none;
    border-color: #1f2937;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
    color: #9ca3af;
}

.form-group textarea {
    resize: vertical;
    min-height: 100px;
}

.radio-group {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 8px;
}

.radio-option {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    padding: 10px;
    border-radius: 6px;
    transition: background-color 0.2s ease;
}

.radio-option:hover {
    background-color: #f3f4f6;
}

.radio-option input[type="radio"] {
    accent-color: #1f2937;
    cursor: pointer;
    width: 18px;
    height: 18px;
}

.radio-option span {
    font-size: 14px;
    color: #374151;
}

.checkbox-option {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    padding: 12px;
    border-radius: 6px;
    transition: background-color 0.2s ease;
}

.checkbox-option:hover {
    background-color: #f3f4f6;
}

.checkbox-option input[type="checkbox"] {
    accent-color: #1f2937;
    cursor: pointer;
    width: 18px;
    height: 18px;
}

.checkbox-option span {
    font-size: 14px;
    color: #374151;
}

.submit-btn {
    padding: 14px 28px;
    background-color: #020617;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 10px;
}

.submit-btn:hover:not(:disabled) {
    background-color: #111827;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(31, 41, 55, 0.2);
}

.submit-btn:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
    transform: none;
}

.spinner {
    font-size: 18px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.submit-message {
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 14px;
    text-align: center;
    margin-top: 12px;
}

.submit-message.success {
    background-color: #f0fdf4;
    color: #166534;
    border: 1px solid #dcfce7;
}

.submit-message.error {
    background-color: #fef2f2;
    color: #991b1b;
    border: 1px solid #fee2e2;
}

/* Info Card */
.info-card {
    background-color: #020617;
    border-radius: 12px;
    padding: 24px;
    height: fit-content;
    position: sticky;
    top: 100px;
}

.info-card h3 {
    font-size: 16px;
    font-weight: 600;
    color: #ffffff;
    margin: 0 0 20px 0;
}

.info-item {
    display: flex;
    gap: 12px;
    margin-bottom: 20px;
}

.info-item:last-child {
    margin-bottom: 0;
}

.info-item:last-child {
    margin-bottom: 0;
}

.info-item ion-icon {
    font-size: 24px;
    color: #ffffff;
    min-width: 24px;
}

.info-item .label {
    font-size: 12px;
    color: #ffffff;
    margin: 0;
    font-weight: 500;
    text-transform: uppercase;
}

.info-item .value {
    font-size: 14px;
    color: #ffffff;
    margin: 4px 0 0 0;
    font-weight: 500;
}

/* Responsive */
@media (max-width: 768px) {
    .hire-me-container {
        padding: 20px 16px;
    }

    .hire-header h1 {
        font-size: 28px;
    }

    .hire-content {
        grid-template-columns: 1fr;
        gap: 30px;
    }

    .fillout-form-section {
        grid-template-columns: 1fr;
        gap: 30px;
    }

    .fillout-form-section-content {
        grid-template-columns: 1fr;
        gap: 30px;
    }

    .form-row {
        grid-template-columns: 1fr;
        gap: 16px;
    }

    .info-card {
        position: static;
    }
}
</style>
