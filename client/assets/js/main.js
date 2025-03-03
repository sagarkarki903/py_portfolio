/*
	Massively by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$nav = $('#nav'),
		$main = $('#main'),
		$navPanelToggle, $navPanel, $navPanelInner;

	// Breakpoints.
		breakpoints({
			default:   ['1681px',   null       ],
			xlarge:    ['1281px',   '1680px'   ],
			large:     ['981px',    '1280px'   ],
			medium:    ['737px',    '980px'    ],
			small:     ['481px',    '736px'    ],
			xsmall:    ['361px',    '480px'    ],
			xxsmall:   [null,       '360px'    ]
		});

	/**
	 * Applies parallax scrolling to an element's background image.
	 * @return {jQuery} jQuery object.
	 */
	$.fn._parallax = function(intensity) {

		var	$window = $(window),
			$this = $(this);

		if (this.length == 0 || intensity === 0)
			return $this;

		if (this.length > 1) {

			for (var i=0; i < this.length; i++)
				$(this[i])._parallax(intensity);

			return $this;

		}

		if (!intensity)
			intensity = 0.25;

		$this.each(function() {

			var $t = $(this),
				$bg = $('<div class="bg"></div>').appendTo($t),
				on, off;

			on = function() {

				$bg
					.removeClass('fixed')
					.css('transform', 'matrix(1,0,0,1,0,0)');

				$window
					.on('scroll._parallax', function() {

						var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);

						$bg.css('transform', 'matrix(1,0,0,1,0,' + (pos * intensity) + ')');

					});

			};

			off = function() {

				$bg
					.addClass('fixed')
					.css('transform', 'none');

				$window
					.off('scroll._parallax');

			};

			// Disable parallax on ..
				if (browser.name == 'ie'			// IE
				||	browser.name == 'edge'			// Edge
				||	window.devicePixelRatio > 1		// Retina/HiDPI (= poor performance)
				||	browser.mobile)					// Mobile devices
					off();

			// Enable everywhere else.
				else {

					breakpoints.on('>large', on);
					breakpoints.on('<=large', off);

				}

		});

		$window
			.off('load._parallax resize._parallax')
			.on('load._parallax resize._parallax', function() {
				$window.trigger('scroll');
			});

		return $(this);

	};

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Scrolly.
		$('.scrolly').scrolly();

	// Background.
		$wrapper._parallax(0.925);

	// Nav Panel.

		// Toggle.
			$navPanelToggle = $(
				'<a href="#navPanel" id="navPanelToggle">Menu</a>'
			)
				.appendTo($wrapper);

			// Change toggle styling once we've scrolled past the header.
				$header.scrollex({
					bottom: '5vh',
					enter: function() {
						$navPanelToggle.removeClass('alt');
					},
					leave: function() {
						$navPanelToggle.addClass('alt');
					}
				});

		// Panel.
			$navPanel = $(
				'<div id="navPanel">' +
					'<nav>' +
					'</nav>' +
					'<a href="#navPanel" class="close"></a>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'is-navPanel-visible'
				});

			// Get inner.
				$navPanelInner = $navPanel.children('nav');

			// Move nav content on breakpoint change.
				var $navContent = $nav.children();

				breakpoints.on('>medium', function() {

					// NavPanel -> Nav.
						$navContent.appendTo($nav);

					// Flip icon classes.
						$nav.find('.icons, .icon')
							.removeClass('alt');

				});

				breakpoints.on('<=medium', function() {

					// Nav -> NavPanel.
						$navContent.appendTo($navPanelInner);

					// Flip icon classes.
						$navPanelInner.find('.icons, .icon')
							.addClass('alt');

				});

			// Hack: Disable transitions on WP.
				if (browser.os == 'wp'
				&&	browser.osVersion < 10)
					$navPanel
						.css('transition', 'none');

	// Intro.
		var $intro = $('#intro');

		if ($intro.length > 0) {

			// Hack: Fix flex min-height on IE.
				if (browser.name == 'ie') {
					$window.on('resize.ie-intro-fix', function() {

						var h = $intro.height();

						if (h > $window.height())
							$intro.css('height', 'auto');
						else
							$intro.css('height', h);

					}).trigger('resize.ie-intro-fix');
				}

			// Hide intro on scroll (> small).
				breakpoints.on('>small', function() {

					$main.unscrollex();

					$main.scrollex({
						mode: 'bottom',
						top: '25vh',
						bottom: '-50vh',
						enter: function() {
							$intro.addClass('hidden');
						},
						leave: function() {
							$intro.removeClass('hidden');
						}
					});

				});

			// Hide intro on scroll (<= small).
				breakpoints.on('<=small', function() {

					$main.unscrollex();

					$main.scrollex({
						mode: 'middle',
						top: '15vh',
						bottom: '-15vh',
						enter: function() {
							$intro.addClass('hidden');
						},
						leave: function() {
							$intro.removeClass('hidden');
						}
					});

			});

		}

		// Function to update the time every second
            function updateTime() {
                const timeElement = document.getElementById("dynamic-time");
                if (!timeElement) return; // Prevent errors if element is missing

                const now = new Date();
                const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
                const formattedTime = now.toLocaleTimeString('en-US', timeOptions);

                timeElement.innerText = formattedTime;
            }

            // Update the time every second
            setInterval(updateTime, 1000);

            // Run immediately on page load
            updateTime();



            // Function to smoothly scroll to the top
            function scrollToTop() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }

            // Attach event listener to the Introduction link
            $(document).ready(function() {
                $('#scroll-to-top').on('click', function(event) {
                    event.preventDefault(); // Prevent default anchor behavior
                    scrollToTop();
                });
            });


        // Function to smoothly scroll to the footer
            function scrollToFooter() {
                const footer = document.querySelector('footer'); // Selects the footer div
                if (footer) {
                    footer.scrollIntoView({ behavior: 'smooth' });
                }
            }

            // Attach event listener to the "Contact Me" link
            $(document).ready(function() {
                $('#scroll-to-footer').on('click', function(event) {
                    event.preventDefault(); // Prevent default anchor behavior
                    scrollToFooter();
                });
            });

            // Function to smoothly scroll to the projects/posts
                function scrollToPosts() {
                    const posts = document.querySelector('#projects-header');
                    if (posts) {
                        posts.scrollIntoView({ behavior: 'smooth' });
                    }
                }

                // Attach event listener to the Projects link
                $(document).ready(function() {
                    $('#scroll-to-posts').on('click', function(event) {
                        event.preventDefault(); // Prevent default anchor behavior
                        scrollToPosts();
                    });
                });

            // Function to smoothly scroll to the intro section
            function scrollToIntro() {
                    const introSection = document.querySelector('.post.featured'); // Target the whole intro section
                    if (introSection) {
                        introSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }

                // Attach event listener to the Intro link
                $(document).ready(function() {
                    $('#scroll-to-intro').on('click', function(event) {
                        event.preventDefault(); // Prevent default anchor behavior
                        scrollToIntro();
                    });
                });

                $(document).ready(function() {
                    var audio = new Audio('/assets/audio/heyAudio.m4a');

                    // Play audio when the header is clicked
                    $('#header').on('click', function() {
                        audio.play().catch(error => console.log("Audio play error:", error));
                    });
                });

                //header changes when hire is clicked
                $(document).ready(function() {
                    $('#header').on('click', function() {
                        $('#intro-text').text('Contact Me! Info Below:');
                    });
                });


                $(document).ready(function() {
    var scrollButton = $('#scrollToTop');

    // Show button when scrolling down 200px
    $(window).scroll(function() {
        if ($(this).scrollTop() > 200) {
            if ($(window).width() > 768) { // Only show on larger screens
                scrollButton.fadeIn();
            }
        } else {
            scrollButton.fadeOut();
        }
    });

    // Scroll to top when button is clicked
    scrollButton.on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 'smooth');
    });
});

document.getElementById("ntfyForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission the default way

        // Get form values
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        // Format the message for ntfy
        const fullMessage = `New Message from ${name} (${email}):\n${message}`;

        // Send to ntfy
        fetch("https://ntfy.sh/karkisa", {
            method: "POST",
            body: fullMessage
        })
        .then(response => {
            if (response.ok) {
                alert("Message sent successfully!");
                document.getElementById("ntfyForm").reset();
            } else {
                alert("Failed to send message.");
            }
        })
        .catch(error => console.error("Error:", error));
    });


})(jQuery);