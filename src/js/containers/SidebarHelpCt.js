import React, { Component } from "react";
import Collapsible from "react-collapsible";
import styled from "styled-components";
import { LightenDarkenColor } from "../util";
import { Link } from "../util/styledComponents";

const HelpCt = styled.div`
  p {
    font-size: 14px;
    line-height: 1.5em;
  }
`;

class SidebarHelpCt extends Component {
  render() {
    return (
      <HelpCt>
        <Collapsible classParentString="accordianMain" trigger="Managing Lists">
          <Collapsible
            classParentString="accordianSub"
            trigger="Where are my Lists?"
          >
            <p>
              Access the folders and lists by clicking on your username link in
              the top navigation bar.
            </p>
          </Collapsible>
          <Collapsible
            classParentString="accordianSub"
            trigger="How do I create a Folder?"
          >
            <p>
              Create a new folder by clicking the top right plus symbol next to
              the search field.
            </p>
          </Collapsible>
          <Collapsible
            classParentString="accordianSub"
            trigger="How do I create a List?"
          >
            <p>
              Create a new list by clicking on the plus symbol under the folder
              header. Each list must be in a folder.
            </p>
          </Collapsible>
          <Collapsible
            classParentString="accordianSub"
            trigger="How do I delete Folders and Lists?"
          >
            <p>
              Delete folders and lists by clicking on the top right trash icon
              next to the search field. Delete buttons will appear next to each
              folder and list.
            </p>
          </Collapsible>
          <Collapsible
            classParentString="accordianSub"
            trigger="How can I rearrange Folders and Lists?"
          >
            <p>Reorganise lists and folders by click and dragging.</p>
          </Collapsible>
          <Collapsible
            classParentString="accordianSub"
            trigger="How do I change the Folder's name?"
          >
            <p>Edit the name of the folder by clicking on the text.</p>
          </Collapsible>
          <Collapsible
            classParentString="accordianSub"
            trigger="How do I change the List's name?"
          >
            <p>
              Edit the name of a list by clicking on the list link and then
              editing the header of the list that will have appeared on the main
              page.
            </p>
          </Collapsible>
          <Collapsible
            classParentString="accordianSub"
            trigger="How do I create List Items?"
          >
            <p>
              Create new items in your list by clicking on the plus symbol at
              the bottom of the list items.
            </p>
          </Collapsible>
          <Collapsible
            classParentString="accordianSub"
            trigger="How do I edit the List Items?"
          >
            <p>Edit the items by clicking on the fields and entering text.</p>
          </Collapsible>
          <Collapsible
            classParentString="accordianSub"
            trigger="How do I change the side to be tested on?"
          >
            <p>
              Select which column you would like to be tested on with the
              ‘Revise’ button above each of the columns. The column with
              ‘Revise’ showing above it will be hidden in the game.
            </p>
          </Collapsible>
          <Collapsible
            classParentString="accordianSub"
            trigger="How do I search through my Lists?"
          >
            <p>
              Use the search bar above the Folders to search all folders for a
              word that already exists in one of your lists. You can search
              through individual lists by using the search bar on the bottom
              toolbar on the main page.
            </p>
          </Collapsible>
          <Collapsible
            classParentString="accordianSub"
            trigger="Can I download my Lists?"
          >
            <p>
              Download individual Lists in CSV format by clicking on the down
              arrow button on the lower toolbar underneath the list.
            </p>
          </Collapsible>
          <Collapsible
            classParentString="accordianSub"
            trigger="Can I upload my own Lists?"
          >
            <p>
              You can upload a CSV file containing your own list by clicking on
              the up arrow button on the lower toolbar at the bottom of the main
              page. The items in the CSV file should be in double quotation
              marks separated by a comma, and a new line separating each row. Eg{" "}
            </p>
            <p>
              “book”, “das Buch”<br />
              “library”, “die Bibliothek”
            </p>
          </Collapsible>
        </Collapsible>
        <Collapsible
          classParentString="accordianMain"
          trigger="The Forgetting Curve"
        >
          <Collapsible
            classParentString="accordianSub"
            trigger="Concept"
            open={true}
          >
            <p>
              The forgetting curve is based on Ebbinghaus’ research into memory
              loss over time. The standard formula is:
            </p>
            <p style={{ textAlign: "center" }}>
              R = e<sup>-t&frasl;s</sup>
            </p>
            <p>
              Where R is memory retention, t is time, and s is strength of
              memory (how well subjects performed in a test).
            </p>
            <p>
              In theory, by revising your lists in increasing intervals over
              time, you are most likely to retain the words in memory, i.e.,
              your Forgetting Curve will become shallower and eventually you
              will not need to revise for years.
            </p>
            <p>
              Read more about the Forgetting Curve{" "}
              <Link
                target="_blank"
                href="https://en.wikipedia.org/wiki/Forgetting_curve"
              >
                here
              </Link>.
            </p>
          </Collapsible>
          <Collapsible
            classParentString="accordianSub"
            trigger="Your Forgetting Curve"
            open={true}
          >
            <p>
              Each list you create will have it’s own graph to track your
              performance in the Game. The graph will then show your projected
              forgetting curve and predict when it would be best that you next
              revise the list to maintain what you have learned.
            </p>
            <p>
              The idea is to stay above the 50% retention line on the Forgetting
              Curve.
            </p>
            <p>
              The projection is assuming you have at least 20 items in your
              list, but there is no restriction on how few (or how many) you are
              allowed.
            </p>
          </Collapsible>
        </Collapsible>
        <Collapsible
          classParentString="accordianMain"
          trigger="Playing the Game"
        >
          <p>
            The game is a variant of the{" "}
            <Link
              target="_blank"
              href="https://en.wikipedia.org/wiki/Leitner_system"
            >
              Leitner system
            </Link>{" "}
            for learning flashcards. The game requires you to repeat each of the
            list items at least three times, shown to you in random order, and
            getting an answer wrong will result in that item back at zero. The
            purpose is that you repeat items you struggle with more than those
            you don’t, and should reduce overall study time.
          </p>

          <p>
            Each completed Game is recorded to estimate your Forgetting Curve
            and the next best revision date.
          </p>
        </Collapsible>
      </HelpCt>
    );
  }
}

export default SidebarHelpCt;
