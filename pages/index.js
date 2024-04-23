import HomeLayout from "@/Layouts/HomeLayout";
import LeftBar from "@/components/LeftBar";
import Nav from "@/components/Nav";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <HomeLayout>
      <div className={styles.container}>
        <h1 className={styles.title}>
          The best place to build, test, and discover front-end code.
        </h1>
        <h3 className={styles.subtitle}>
          CodePen is a social development environment for front-end designers
          and developers. Build and deploy a website, show off your work, build
          test cases to learn and debug, and find inspiration.
        </h3>
        <div className={styles.row}>
          <div className={styles.item}>
            <img
              src="https://cpwebassets.codepen.io/assets/packs/icon-build-0f21c66ed03bfb36c597636d27ca621e.svg"
              alt="Icon of conveyer belt with boxes on it."
            />
            <h3 className={styles.itemtitle}>Build & Test</h3>
            <p className={styles.itemcontnt}>
              Get work done quicker by building out entire projects or isolating
              code to test features and animations. Want to keep it all under
              wraps? Upgrade to a PRO account to keep your work private.
            </p>
          </div>
          <div className={styles.item}>
            <img
              src="https://cpwebassets.codepen.io/assets/packs/icon-learn-b1311620e99cea826f259aa2f7750940.svg"
              alt="Icon of Map"
            />
            <h3 className={styles.itemtitle}>Learn & Discover</h3>
            <p className={styles.itemcontnt}>
              Want to upgrade your skills and get noticed? Participating in
              CodePen Challenges is a great way to try something new. We
              frequently feature these Pens on our homepage and across social
              media!
            </p>
          </div>
          <div className={styles.item}>
            <img
              src="https://cpwebassets.codepen.io/assets/packs/icon-share-910c683bbac21bf41fcf9aab64ebc957.svg"
              alt="Icon of Globe"
            />
            <h3 className={styles.itemtitle}>Share Your Work</h3>
            <p className={styles.itemcontnt}>
              Become a part of the most active front-end community in the world
              by sharing work. Presenting at a conference? Show your code
              directly in the browser with Presentation Mode.
            </p>
          </div>
        </div>
        <div className={styles.footer}>
          <p className={styles.footertitle}>Bring the Whole Team</p>
          <p>
            Each team and team member gets all the features of a PRO membership.
            That means the Team can do things like upload Assets, use features
            like Collab Mode, Professor Mode, Presentation Mode, and Live View,
            and apply custom CSS to Posts, Profiles, and Embeds.
          </p>
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <button className="btn btn-success">Start Team</button>
          </div>
          <h3>Loved by hundreds of teams, including:</h3>
          <div className={styles.grid}>
            <img
              src="https://cpwebassets.codepen.io/assets/packs/airbnb-cb44d3434e60956b120c2cfd2afa9a23.png"
              alt="Airbnb"
              width="68px"
            />
            <img
              src="https://cpwebassets.codepen.io/assets/packs/grubhub-f05150a98afe6175f221f4bc75ac3372.png"
              alt="Grubhub"
              width="149px"
            />
            <img
              src="https://cpwebassets.codepen.io/assets/packs/square-e4a6fa8c30a53180c593a11aeb1618c2.png"
              alt="Square"
              width="71px"
            />
            <img
              src="https://cpwebassets.codepen.io/assets/packs/netflix-8b4f0b76ad5ccaa1b6326267be6c396f.png"
              alt="Netflix"
              width="125px"
            />
            <img
              src="https://cpwebassets.codepen.io/assets/packs/adobe-0d9fee1af16f2db73270e52fbdcf4fe8.png"
              alt="Adobe"
              width="72px"
            />
            <img
              src="https://cpwebassets.codepen.io/assets/packs/salesforce-63204abcda6bd196c6a6da3bb4911510.png"
              alt="Salesfoce"
              width="137px"
            />
            <img
              src="https://cpwebassets.codepen.io/assets/packs/microsoft-0859118499110df3a66f00a999a53a40.png"
              alt="Microsoft"
              width="209px"
            />
            <img
              src="https://cpwebassets.codepen.io/assets/packs/lyft-87acc577a28f7c5fbafbed09b543dd91.png"
              alt="Lyft"
              width="70px"
            />
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
