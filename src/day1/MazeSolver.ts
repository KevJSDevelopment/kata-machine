/* 
const maze = [
    "xxxxxxxxxx x",
    "x        x x",
    "x        x x",
    "x xxxxxxxx x",
    "x          x",
    "x xxxxxxxxxx",
];

Base Cases
    1. off the map
    2. its a wall
    3. its the end
    4. if we have seen it
*/

const dir = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1]
]

function walk(maze: string[], wall: string, curr: Point, end: Point, seen: boolean[][], path: Point[]): boolean {
    
    // off the map
    if(curr.x < 0 || curr.x >= maze[0].length || curr.y < 0 || curr.y >= maze.length) return false;

    // on a wall
    if(maze[curr.y][curr.x] === wall) return false;

    // check if seen
    if(seen[curr.y][curr.x]) return false;

    // its the end
    if(curr.x === end.x && curr.y === end.y) {
        path.push(curr);
        return true;
    }
    // 3 steps

    // pre
    seen[curr.y][curr.x] = true;
    path.push(curr);

    // recurse
    for (let i = 0; i < dir.length; ++i){
        const [x, y] = dir[i];

        if(walk(maze, wall, { x: curr.x + x, y: curr.y + y }, end, seen, path)) return true;
    }

    // post
    // VERY IMPORTANT:
    // if we can't make any moves, we remove the current point, so we move back to the previous point.
    /*
        example: [
              s
            "x xxxxxx",
            "x xx  _x",
            "x    xxx",
            "xxx xxxx",
            "xxx xxxx"
                e
        ]

        So imagine we get to the point at the underscore, we did not reach the end but we also have no more places to move.
        Therefore, we must backtrack. This is what the pop does, we will retrace until we go back to a point with another option.

    */
    path.pop()

    return false;
}

export default function solve(maze: string[], wall: string, start: Point, end: Point): Point[] {
    const seen: boolean[][] = [];
    const path: Point[] = [];

    for(let i = 0; i < maze.length; ++i){
        seen.push(new Array(maze[0].length).fill(false));
    }

    walk(maze, wall, start, end, seen, path);

    return path;
}