---
title: Multisite network
description: Using Lumtera and Lumtera Pro on WordPress multisite, including the network license and the network overview (Agency and Unlimited plans).
---

# Multisite network

## The free plugin on multisite

Lumtera works on multisite, activated network-wide or on individual sites. Each site has its own results, settings and report. When you uninstall it, its data is removed from every site in the network. See [Data & uninstall](/developers/data).

## One license for the network {#one-license-for-the-network}

<p><span class="pro-pill">Pro</span> Agency and Unlimited plans</p>

If Lumtera Pro is **network-activated**, one license covers every site in the network, using a single site activation for the network's main address.

<ol class="step-list">
  <li>Go to <span class="screen-path">Network Admin → Accessibility → License</span>.</li>
  <li>Enter your license key and click <strong>Activate</strong>.</li>
</ol>

Only super admins can manage the network license. On each site, <span class="screen-path">Lumtera → Settings → License</span> shows a read-only summary: *"This network's license is managed by the network administrator. It covers every site in the network."* Super admins also get a **Manage the network license** button there.

If the main site already had a license before you network-activated Pro, it's adopted as the network license automatically, without using another activation.

### Personal and Growth keys

A Personal or Growth key is refused for a network with *"Network activation needs the Agency or Unlimited plan…"*. A refused key doesn't keep an activation.

To use one of these keys on a network, network-deactivate Lumtera Pro, then activate the plugin and the key on each site. Each site then needs its own activation.

If a network already has a license below Agency (for example one adopted from the main site), it keeps working on the **main site only**. Super admins see a notice in Network Admin explaining this, with an **Open your account** link to upgrade. Administrators of the other sites see that Lumtera Pro isn't active on their site, and the License section shows **Main site only**.

## Network overview {#network-overview}

<p><span class="pro-pill">Pro</span> Agency and Unlimited plans</p>

<span class="screen-path">Network Admin → Accessibility → Overview</span> (**Accessibility across the network**) lists every site in the network with its **Score**, **Errors**, **Needs review** and **Checked** count, 50 sites per page, with the worst first on each page. **Search sites** by address (domain or path), and use **Open overview** to go to that site's Lumtera screens to scan it or see its issues. Only super admins can open it.

Sites where Lumtera isn't active say *"Lumtera is not active on this site."* Sites that haven't been scanned yet say *"Not checked yet."*

On a lower plan, the screen says the network overview needs the Agency plan or above, with a link to the network license.

For client sites that aren't in your network, use the [Client portfolio](/pro/portfolio) (Growth plan and up).
