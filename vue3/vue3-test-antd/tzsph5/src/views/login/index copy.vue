<template>
  <div class="login">
    <div class="wrapper">
      <div class="login-header">
        <div class="title">
          {{ title }}
        </div>
        <div class="service_link" @click="customLink()">
          <img src="@/assets/icon/icon_service.svg" />
        </div>
      </div>
    </div>

    <div class="login-container">
      <div class="icon-bg">
        <div class="icon-img">
          <img :src="img_url" alt="" />
        </div>
      </div>
      <div class="login-input">
        <van-form @submit="submit">
          <van-field
            class="input-box username"
            v-model="username"
            placeholder="Username"
            :border="false"
            size="large"
            clearable
            :rules="[
              { required: true, message: 'please enter username' },
              { validator: (val) => /^[a-zA-Z0-9]+$/.test(val), message: 'Only letters and numbers can be entered!' },
              { validator: (val) => /^[a-zA-Z0-9]{6,18}$/.test(val), message: 'The length is between 6 and 18 letters or numbers!' },
            ]"
          />
          <van-field
            class="input-box password"
            v-model="password"
            placeholder="Password"
            :border="false"
            size="large"
            autocomplete
            :type="eyeFlag ? 'text' : 'password'"
            :rightIcon="eyeFlag ? 'eye-o' : 'closed-eye'"
            @click-right-icon="eyeFlag = !eyeFlag"
            clearable
            :rules="[
              { required: true, message: 'please enter password' },
              { validator: (val) => /^.{6,18}$/.test(val), message: 'The length is between 6 and 18 bits!' },
            ]"
          />
          <div class="remember">
            <div class="checkbox" :class="{ 'is-checked': isChecked }" @click="isChecked = !isChecked"></div>
            <div class="text">Remember me</div>
          </div>

          <van-button
            class="login-btn"
            native-type="submit"
            :disabled="!(/^[a-zA-Z0-9]{6,18}$/.test(username) && /^(?:\d|[a-zA-Z]|[!@#$%^&*]){6,18}$/.test(password))"
          >
            Login
          </van-button>
        </van-form>
        <div class="specification">
          <div
            class="checkbox"
            :class="{ 'is-checked': isCheckedSpecification }"
            @click="isCheckedSpecification = !isCheckedSpecification"
          ></div>
          <div class="text">
            I have read and agree to the <span @click="isShowTerms = true">Terms of Service</span> and
            <span @click="isShowPolicy = true">Privacy Policy</span>
          </div>
        </div>
      </div>
      <div class="footer"><span>Don't have account yet?</span><a @click="router.push('/register')"> Create Account </a></div>
    </div>
  </div>
  <van-dialog
    v-model:show="isShowTerms"
    title="Terms of Service"
    message-align="left"
    message="
1. In order to avoid disputes when betting on this website, all users must read the rules set by this platform before entering the website. Once a customer enters this website to place a bet, it will be deemed to have accepted this platform All agreements and rules of.

2. Please modify your login password and fund password regularly. Members are responsible for ensuring the confidentiality of their account and login information. Any online betting made with a member account and password will be considered valid. Please change the password from time to time. If the account password is stolen, the company will not be liable for compensation.

3. Betting related terms: ①If online betting is not successfully submitted, the bet will be considered invalid. ②When the player is automatically or forcibly disconnected during the draw and there is no result, it will not affect the result of the draw settlement. ③Due to the unstable official website lottery draw, in order to ensure a fair and open game, the platform has made the following decision: In case of official website lottery draw delay, the order can be withdrawn if the following two conditions are met, and once the order is cancelled, the official website will be invalid after the reopen , A: After the next draw, the previous draw has not been drawn, all orders in this period will be considered invalid and will be cancelled! b: If the draw delay time exceeds 30 minutes and the official website has not drawn the prize, all orders in the period will be considered invalid (in addition, if the overclocking color type exceeds 6 periods, the reissue will be invalid) and the order will be cancelled! If you have any objection to this regulation, please do not use it, and betting on the time lottery shall be deemed to agree to this agreement. ④In the event of irresistible disasters, hacker intrusions, or network problems causing data loss, the company’s announcement is the final plan. ⑤The company will record all electronic transactions. If there is any dispute, the company will refer to the betting record.

4. If it is discovered by the company that members use plug-ins to place bets in an improper manner, or any personal or group betting made in any abnormal manner that harms the interests of the company, the company reserves the right to cancel such bets and bets Generated bonuses and deactivate the member account. Regardless of whether the agent or the member discovers the vulnerability and does not report it, uses the vulnerability to maliciously brush money, cheats through illegal means, or spreads rumors and slanders, those who attack the platform will unconditionally freeze their account after verification by the platform, and all account money will not be returned.

5. If the company discovers that a member has repeatedly applied for an account, it reserves the right to cancel and withdraw all the member's preferential bonuses, as well as the profit generated by the preferential bonus. Each player, each address, each email address, each phone number, the same payment card/credit card number, and shared computer environment (for example: Internet cafes, other public computers, etc.) can only have one member account, and various offers Only applicable to each customer's unique account in the company.

6. The highest prize limit of each period of this platform's high-frequency color is 9999999999 Rs, and the excess is calculated at 9999999999 Rs, and the excess prize is invalid and cleared to 0; the maximum prize limit of each period of low-frequency color Rs, the excess is calculated by 9999999999, the same ip is counted as the same account, the excess bonus is invalid and cleared to 0. Reminder: Bonus odds will be adjusted from time to time according to official standards, please refer to real-time odds.

7. The heads-up prize limit of any color on this platform is 20000, and the excess is calculated at 20000, and the excess prize is invalid and cleared to 0. If there are multiple accounts maliciously betting on the same number, the platform has the right to cancel all bets. Single-period betting is less than or equal to 2%, which is a heads-up mode. Judgment rule: When the number of bets in a single period is 'smaller than or equal' to '2%' of the all-inclusive bet of the game, it is regarded as a heads-up mode. For example: [Five-star direct selection] 5001 bets or less, [four-star direct selection] 501 bets or less, [Samsung direct selection] 51 bets or less, etc. All color types 'and' are heads-ups (including optional gameplay and five-star combinations with a low probability of winning (How to play, etc.) It is recommended that members pay attention to their own bets and the amount of winnings when placing bets. The platform will not be responsible for exceeding the bonus limit. In case of disputes, this platform shall prevail.
In order to prevent malicious streaming, arbitrage, etc., the platform will ban betting rates for all colors, and betting during the period cannot exceed 80% of the total bet. Chongqing and Xinjiang can be equal to 80%. (For example: Samsung 800 bet, star 80 bet, betting at the same time (the purchase amount is the same, betting at the same time, etc.) phenomenon, it was found that the first time was punished by 10 times the flow, and the second time was permanent Freeze processing.

8. The platform withdrawal time is from 00:00:00-00:00:00. The minimum single withdrawal is 110 Rs and the highest single withdrawal is 150000 Rs. You can withdraw at most 5 times a day.

9. In order to prevent malicious money laundering, member withdrawals must consume 50% of the recharge (100% of third-party consumption) before proceeding, otherwise the finance will not be accepted.

10. The platform customer service does not have any QQ or other contact information. The only way to jump to online customer service is to click on the customer service hotline in the menu bar. Others are fake, please keep in mind, so the deceived platform is not responsible for such issues.

11. The bank or Tenpay recharge account is changed from time to time. Please open the recharge interface to get the latest receiving account before recharging each time. If you charge wrongly, you are free to bear any losses and have nothing to do with the platform.

12. The company reserves the right to modify or add to this agreement or game rules or confidentiality regulations from time to time. The changed terms will take effect immediately after the change occurs, and all disputes and the final decision right are reserved."
  >
  </van-dialog>
  <van-dialog v-model:show="isShowPolicy" title="Privacy Policy" message-align="left" :message="privacyPolicy"> </van-dialog>
</template>

<script>
import CryptoJS from "crypto-js";
import { getCurrentInstance, onMounted, computed, ref, defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { Dialog, Notify } from "vant";
import { login, customerUrl } from "@/api/login.js";
import { setToken } from "@/utils/auth";
import { encryptByDES, decryptByDES } from "@/utils/string";
import Cookies from "js-cookie";
export default defineComponent({
  name: "Login",
  components: {},
  setup(props, context) {
    const router = useRouter();
    const store = useStore();
    const username = ref("");
    const password = ref("");
    const eyeFlag = ref(false);
    const isShowTerms = ref(false);
    const isShowPolicy = ref(false);
    const isChecked = ref(false);
    const isCheckedSpecification = ref(true);
    const customLink = () => {
      customerUrl().then((res) => {
        if (+res.code === 1) {
          window.location.href = res.data.customer_service_address;
        } else {
          Notify({
            type: "warning",
            message: res.msg,
          });
        }
      });
    };
    const submit = () => {
      if (!username.value) {
        Dialog.alert({ message: "please enter username" });
        return;
      }
      if (!password.value) {
        Dialog.alert({ message: "please enter password" });
        return;
      }
      if (!isCheckedSpecification.value) {
        Dialog.alert({ message: "Please read and agree to the terms of service and privacy policy" });
        return;
      }
      login({
        user_name: username.value,
        password: encryptByDES(password.value),
        login_type: 2,
        device_id: navigator.userAgent,
      }).then((res) => {
        if (+res.code === 1) {
          Notify({ type: "success", message: res.msg });
          const token = res.data.token;
          setToken(token);
          store.commit("user/USER_ID", res.data.user_id);
          store.commit("user/SET_LOGIN", true);
          store.commit("user/SET_AGENT_TYPE", res.data.account_type);
          store.commit("user/SET_TOKEN", token);
          router.push("/");
          if (isChecked.value) {
            Cookies.set("userName", username.value, { expires: 90 });
            Cookies.set("userPwd", encryptByDES(password.value), { expires: 90 });
          } else {
            Cookies.remove("userName");
            Cookies.remove("userPwd");
          }
        } else {
          Notify({
            type: "warning",
            message: res.msg,
          });
        }
      });
    };
    const privacyPolicy = `
Thanks for using {{title}}! Here we describe how we collect, use, and handle your personal data when you use our websites, software, and services (“Services”).

What & Why
We collect and use the following information to provide, improve, protect, and promote our Services.

Account information. We collect, and associate with your account, the information you provide to us when you do things such as sign up for your account, upgrade to a paid plan, and set up two-factor authentication (like your name, email address, phone number, payment info, and physical address).

Your Stuff. Our Services are designed as a simple and personalized way for you to store your files, documents, photos, comments, messages, and so on (“Your Stuff”), collaborate with others, and work across multiple devices and services. To make that possible, we store, process, and transmit Your Stuff as well as information related to it. This related information includes your profile information that makes it easier to collaborate and share Your Stuff with others, as well as things like the size of the file, the time it was uploaded, collaborators, and usage activity.

Contacts. You may choose to give us access to your contacts to make it easy for you to do things like share and collaborate on Your Stuff, send messages, and invite others to use the Services. If you do, we’ll store those contacts on our servers for you to use.

Usage information. We collect information related to how you use the Services, including actions you take in your account (like sharing, editing, viewing, creating and moving files or folders). We use this information to provide, improve, and promote our Services, and protect {{title}} users. Please refer to our FAQ for more information about how we use this usage information.

Device information. We also collect information from and about the devices you use to access the Services. This includes things like IP addresses, the type of browser and device you use, the web page you visited before coming to our sites, and identifiers associated with your devices. Your devices (depending on their settings) may also transmit location information to the Services. For example, we use device information to detect abuse and identify and troubleshoot bugs.

Cookies and other technologies. We use technologies like cookies and pixel tags to provide, improve, protect, and promote our Services. For example, cookies help us with things like remembering your username for your next visit, understanding how you are interacting with our Services, and improving them based on that information. You can set your browser to not accept cookies, but this may limit your ability to use the Services. If our systems receive a DNT:1 signal from your browser, we’ll respond to that signal as outlined here. We may also use third-party service providers that set cookies and similar technologies to promote {{title}} services. You can learn more about how cookies and similar technologies work, as well as how to opt out of the use of them for advertising purposes, here.

Marketing. We give users the option to use some of our Services free of charge. These free Services are made possible by the fact that some users upgrade to one of our paid Services. If you register for our Services, we will, from time to time, send you information about upgrades when permissible. Users who receive these marketing materials can opt out at any time. If you don’t want to receive a particular type of marketing material from us, click the ‘unsubscribe’ link in the corresponding emails, or update your preferences in the Notifications section of your personal account.

We sometimes contact people who don’t have a {{title}} account. For recipients in the EU, we or a third party will obtain consent before reaching out. If you receive an email and no longer wish to be contacted by {{title}}, you can unsubscribe and remove yourself from our contact list via the message itself.

Bases for processing your data. We collect and use the personal data described above in order to provide you with the Services in a reliable and secure manner. We also collect and use personal data for our legitimate business needs. To the extent we process your personal data for other purposes, we ask for your consent in advance or require that our partners obtain such consent. For more information on the lawful bases for processing your data, please see our FAQ.

For more details on the categories of personal information that are included in the information above, please see our FAQ.

With Whom
We may share information as discussed below, but we won’t sell it to advertisers or other third parties.

Others working for and with {{title}}. {{title}} uses certain trusted third parties (for example, providers of customer support and IT services) for the business purposes of helping us provide, improve, protect, and promote our Services. These third parties will access your information to perform tasks on our behalf, and we’ll remain responsible for their handling of your information per our instructions. For a list of trusted third parties that we use to process your personal data and more details on the categories of personal information that we’ve disclosed, please see our FAQ.

Other {{title}} Companies. {{title}} shares infrastructure, systems, and technology with other {{title}} Companies to provide, improve, protect, and promote {{title}} Company Services. We process your information across the {{title}} Companies for these purposes, as permitted by applicable law and in accordance with their terms and policies. For more information on {{title}} Companies, {{title}} Company Services, and how your data is used, please see our FAQ.

Other users. Our Services display information like your name, profile picture, device, email address, and usage information to other users you collaborate or choose to share with. When you register your {{title}} account with an email address on a domain owned by your employer or organization, we may help collaborators and administrators find you and your team by making some of your basic information—like your name, team name, profile picture, and email address—visible to other users on the same domain. This helps you sync up with teams you can join and helps other users share files and folders with you.

Certain features let you make additional information available to others.

Other applications. You can choose to connect your {{title}} account with third-party services––for example, via {{title}} APIs. By doing so, you’re enabling {{title}} and those third parties to exchange information about you and data in your account so that {{title}} and those third parties can provide, improve, protect, and promote their services. Please remember that third parties’ use of your information will be governed by their own privacy policies and terms of service.

Business Team Admins. If you are a user of a {{title}} Business team (collectively, “{{title}} Business Team”), your administrator may have the ability to access and control your {{title}} Business Team account. Please refer to your organization’s internal policies if you have questions about this. If you aren’t a {{title}} Business Team user but interact with a {{title}} Business Team user (for example, by joining a shared folder or accessing stuff shared by that user), members of that organization may be able to view the name, email address, profile picture, and IP address that was associated with your account at the time of that interaction. If you share Your stuff with a {{title}} team user, the administrator of the team account may have the ability to access and edit what you share.

Law & Order and the Public Interest. We may disclose your information to third parties if we determine that such disclosure is reasonably necessary to: (a) comply with any applicable law, regulation, legal process, or appropriate government request; (b) protect any person from death or serious bodily injury; (c) prevent fraud or abuse of {{title}} or our users; (d) protect {{title}}’s rights, property, safety, or interest; or (e) perform a task carried out in the public interest.

Stewardship of your data is critical to us and a responsibility that we embrace. We believe that your data should receive the same legal protections regardless of whether it’s stored on our Services or on your home computer’s hard drive. We’ll abide by the following Government Request Principles when receiving, scrutinizing, and responding to government requests (including national security requests) for your data:

Be transparent
Fight blanket requests
Protect all users, and
Provide trusted services.
We publish a Transparency Report as part of our commitment to informing you about when and how governments ask us for information. This report details the types and numbers of requests we receive from law enforcement. We encourage you to review our Government Request Principles and Transparency Report for more detailed information on our approach and response to government requests.

How
Security. We have a team dedicated to keeping your information secure and testing for vulnerabilities. We continue to work on features to keep your information safe in addition to things like two-factor authentication, encryption of files at rest, and alerts when new devices and apps are linked to your account. We deploy automated technologies to detect abusive behavior and content that may harm our Services, you, or other users.

User Controls. You can access, amend, download, and delete your personal information by logging into your {{title}} account and going to your account settings page. Learn more here about managing your account information generally, or click here to learn how to change your profile information.

Retention. When you sign up for an account with us, we’ll retain information you store on our Services for as long as your account exists or as long as we need it to provide you the Services. If you delete your account, we’ll initiate deletion of this information after 30 days. Learn more here. But please note: (1) there might be some latency in deleting this information from our servers and back-up storage; and (2) we may retain this information if necessary to comply with our legal obligations, resolve disputes, or enforce our agreements.

Where
Around the world. To provide you with the Services, we may store, process, and transmit data in the United States and locations around the world—including those outside your country. Data may also be stored locally on the devices you use to access the Services.

EU-U.S. Privacy Shield and Swiss-U.S. Privacy Shield. When transferring data from the European Union, the European Economic Area, the United Kingdom, and Switzerland, {{title}} relies upon a variety of legal mechanisms, including contracts with our customers and affiliates. {{title}} complies with the EU-U.S. and Swiss–U.S. Privacy Shield Frameworks as set forth by the U.S. Department of Commerce regarding the collection, use, and retention of personal data transferred from the European Union, the European Economic Area, the United Kingdom, and Switzerland to the United States. {{title}} has certified to the Department of Commerce that it adheres to the Privacy Shield Principles with respect to such data You can find {{title}}’s Privacy Shield certification here. You can also learn more about Privacy Shield at https://www.privacyshield.gov.

{{title}} is subject to oversight by the U.S. Federal Trade Commission. JAMS is the US-based independent organization responsible for reviewing and resolving complaints about our Privacy Shield compliance—free of charge to you. We ask that you first submit any such complaints directly to us via privacy@{{title}}.com. If you aren’t satisfied with our response, please contact JAMS at https://www.jamsadr.com/eu-us-privacy-shield. In the event your concern still isn’t addressed by JAMS, you may be entitled to a binding arbitration under Privacy Shield and its principles.

Your Control and Access of Your Data
You have control over your personal data and how it’s collected, used, and shared. For example, you can:

Delete Your Stuff in your {{title}} account. You can learn more about how to delete files saved on {{title}} here.
Change or correct personal data. You can manage your account and the content contained in it, as well as edit some of your personal data, through your account settings page.
Access and take your data elsewhere. You can access your personal data from your {{title}} account and you can download a copy of Your Stuff in a machine readable format as outlined here. You can also ask us for a copy of personal data you provided to us or that we’ve collected, the business or commercial purpose for collecting it, the types of sources we got it from, and types of third parties we’ve shared it with.
Object to the processing of your personal data. Depending on the processing activity, you can request that we stop or limit processing of your personal data.
If you would like to submit a data access request, request that your personal data be deleted, or object to the processing of your personal data, please email us at privacy@{{title}}.com. For more information on how to control and access your personal data, please see our FAQ.

{{title}} as controller or processor. If you reside in North America (the United States, Canada, and Mexico), {{title}}, Inc. acts as your service provider. For all other users, {{title}} International Unlimited Company acts as a controller of your personal data. If you are a {{title}} Business or Education customer outside of North America, {{title}} acts as a processor of your data.

Changes
If we’re involved in a reorganization, merger, acquisition, or sale of our assets, your data may be transferred as part of that deal. We’ll notify you (for example, via a message to the email address associated with your account) of any such deal and outline your choices in that event.

We may revise this Privacy Policy from time to time, and will post the most current version on our website. If a revision meaningfully reduces your rights, we will notify you.

Contact
Have questions or concerns about {{title}}, our Services, and privacy? Contact our Data Protection Officer at privacy@{{title}}.com. If they can’t answer your question, you have the right to contact your local data protection supervisory authority.`;
    onMounted(() => {
      const user = Cookies.get("userName");
      const pass = Cookies.get("userPwd");
      if (user && pass) {
        username.value = user;
        password.value = decryptByDES(pass);
        isChecked.value = true;
      }
    });
    return {
      router,
      username,
      password,
      eyeFlag,
      submit,
      isShowTerms,
      isShowPolicy,
      isChecked,
      isCheckedSpecification,
      customLink,
      title: computed(() => store.state.user.indexText),
      img_url: computed(() => store.state.user.titleImg),
      privacyPolicy: privacyPolicy.replace("{{title}}", store.state.user.indexText),
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
