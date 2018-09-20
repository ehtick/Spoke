import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./dialog.scss";
import Button from "../Button";
import Header from "../Header";
import StringInput from "../inputs/StringInput";
import BooleanInput from "../inputs/BooleanInput";

export default class PublishDialog extends Component {
  static propTypes = {
    hideDialog: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
    screenshotURL: PropTypes.string,
    attribution: PropTypes.string,
    onPublish: PropTypes.func,
    published: PropTypes.bool,
    sceneUrl: PropTypes.string,
    initialName: PropTypes.string,
    initialDescription: PropTypes.string,
    initialAllowRemixing: PropTypes.bool,
    initialAllowPromotion: PropTypes.bool,
    isNewScene: PropTypes.bool
  };

  static defaultProps = {
    initialName: "",
    initialDescription: "",
    initialAllowRemixing: true,
    initialAllowPromotion: true
  };

  constructor(props) {
    super(props);

    this.state = {
      name: props.initialName,
      description: props.initialDescription,
      allowRemixing: props.initialAllowRemixing,
      allowPromotion: props.initialAllowPromotion,
      isNewScene: props.isNewScene
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (this.props.onPublish) {
      this.props.onPublish(this.state);
    }
  };

  render() {
    const { onCancel, hideDialog, screenshotURL, published, sceneUrl, attribution } = this.props;
    return (
      <div className={styles.dialogContainer}>
        <Header title="Publish to Hubs" />
        <div className={styles.publishContainer}>
          <div className={styles.content}>
            <img className={styles.sceneThumbnail} src={screenshotURL} />
            <div>
              <form id="publish" onSubmit={this.handleSubmit}>
                {this.state.isNewScene && !published ? (
                  <div className={styles.inputField}>
                    <label className={styles.label}>Scene Name:</label>
                    <StringInput
                      id="name"
                      required
                      pattern=".{4,}"
                      title="Name must be at least 4 characters."
                      value={this.state.name}
                      className={styles.name}
                      onChange={name => this.setState({ name })}
                    />
                  </div>
                ) : (
                  <div className={styles.titleRow}>
                    <div className={styles.contentTitle}>{this.state.name}</div>

                    {!published && <Button onClick={() => this.setState({ isNewScene: true })}>New Scene</Button>}
                  </div>
                )}
                {!published ? (
                  <div>
                    <div className={styles.inputField}>
                      <label className={styles.label}>Scene Description:</label>
                      <textarea
                        className={styles.description}
                        id="description"
                        value={this.state.description}
                        onChange={e => this.setState({ description: e.target.value })}
                      />
                    </div>
                    <div className={styles.inputField}>
                      <div className={styles.checkboxRow}>
                        <label htmlFor="allowRemixing">
                          Allow{" "}
                          <a
                            href="https://github.com/MozillaReality/Spoke/blob/master/REMIXING.md"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Remixing
                          </a>
                        </label>
                        <BooleanInput
                          id="allowRemixing"
                          value={this.state.allowRemixing}
                          onChange={allowRemixing => this.setState({ allowRemixing })}
                        />
                      </div>
                    </div>
                    <div className={styles.inputField}>
                      <div className={styles.checkboxRow}>
                        <label htmlFor="allowPromotion">
                          Allow Mozilla to{" "}
                          <a
                            href="https://github.com/MozillaReality/Spoke/blob/master/PROMOTION.md"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            promote
                          </a>{" "}
                          my scene
                        </label>
                        <BooleanInput
                          id="allowPromotion"
                          value={this.state.allowPromotion}
                          onChange={allowPromotion => this.setState({ allowPromotion })}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={styles.publishInfo}>
                    <span>Your scene has been published to Hubs.</span>
                    <Button href={sceneUrl} target="_blank">
                      View Your Scene
                    </Button>
                  </div>
                )}
              </form>
              {!published &&
                attribution && (
                  <div className={styles.attribution}>
                    <label>Attribution:</label>
                    <p className={styles.attributionText}>{attribution}</p>
                  </div>
                )}
            </div>
          </div>
        </div>
        {published ? (
          <div className={styles.bottom}>
            <Button key="ok" className={styles.cancel} onClick={hideDialog}>
              Close
            </Button>
          </div>
        ) : (
          <div className={styles.bottom}>
            <Button key="cancel" onClick={onCancel || hideDialog} className={styles.cancel}>
              Cancel
            </Button>
            <Button key="publish" type="submit" form="publish">
              {this.state.isNewScene ? "Publish" : "Re-Publish"}
            </Button>
          </div>
        )}
      </div>
    );
  }
}